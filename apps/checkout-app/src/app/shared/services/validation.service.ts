import { Injectable } from '@angular/core';
import Cart from '@orxe-checkout-sdk/cart';
import { Http, HttpHeaders, HttpResponse } from '@orxe-sdk/http';
import { throwError } from 'rxjs';
import {
  catchError,
  finalize,
  last,
  map,
  retry
} from 'rxjs/operators';
import { environment } from '@env/environment';
import { LoggingService } from './logging.service';
import { LOGGING_CONSTANTS, CHECKOUT_CONST } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private _http: Http;
  private _httpHeader: HttpHeaders;

  constructor(
    private readonly _cartSdk: Cart,
    private _loggingService: LoggingService
  ) {
    this._http = new Http();
    this._httpHeader = new HttpHeaders({
      Accept: 'application/xml',
    });
  }

  static validateBinResponse(xml: any) {
    const binResponseObj = {
      isValidBin: false,
      errorCode: '',
      message: '',
    };
    if (xml) {
      let match = xml.match(/\<Success>(.*)<\/Success>/);
      if (match && match.length) {
        binResponseObj.isValidBin =
          xml.match(/\<Success>(.*)<\/Success>/)[1].toLowerCase() === 'true';
        binResponseObj.message = CHECKOUT_CONST.BIN_SUCCESS_MSG;
      } else {
        //  Get error code and message from xml response
        let errorMatch = xml.match(/\<Error>(.*)<\/Error>/);
        if (errorMatch && errorMatch.length) {
          binResponseObj.errorCode = errorMatch[1].match(
            /\<Code>(.*)<\/Code>/
          )[1];
          binResponseObj.message = errorMatch[1].match(
            /\<Message>(.*)<\/Message>/
          )[1];
        }
      }
    }
    return binResponseObj;
  }

  checkOFAC(userInfo) {
    return this._cartSdk.securityOperations.ofacCheck(userInfo);
  }

  validateBin(request: any) {
    let status = 'Success';
    let msg = '';
    const url = `${environment.binUrl}${request.cardNumber}/${request.isAgent}`;
    const started = Date.now();
    return this._http.get(url, this.getOptions()).pipe(
      // TODO when actual BFF API is available we can use retry for specific error codes
      // retryWhen((errors) =>
      //   errors.pipe(
      //     concatMap((error, count) => {
      //       // Add condition for specific error code eg: (error.status == 500 || error.status == 504)
      //       if (count < CHECKOUT_CONST.BIN_RETRY_COUNT) {
      //         return of(error.status);
      //       }

      //       return throwError(error);
      //     }),
      //     take(CHECKOUT_CONST.BIN_RETRY_COUNT)
      //   )
      // ),
      retry(CHECKOUT_CONST.BIN_RETRY_COUNT),
      last()
    )
      .pipe(
        map((data: any) => {
          if (data) {
            const resp = ValidationService.validateBinResponse(data);
            msg = resp.message;
            return resp;
          }
          return throwError(CHECKOUT_CONST.BIN_FAILURE_MSG);
        }),
        catchError((err) => {
          status = err.status || 'Failed';
          msg = err.message;
          return throwError(err);
        }),
        finalize(() => {
          const elapsed = Date.now() - started;
          this._loggingService.traceLog({
            source: LOGGING_CONSTANTS.SOURCE,
            api: LOGGING_CONSTANTS.BIN.API,
            verb: LOGGING_CONSTANTS.BIN.VERB,
            methodName: LOGGING_CONSTANTS.BIN.METHOD_NAME,
            msg,
            timeTakenInMs: elapsed,
            category: 'Trace',
            appName: environment.nameSpace,
            additionalInfo: {
              status,
            },
          });
        })
      );
  }

  private getOptions(): any {
    return {
      headers: this._httpHeader,
      observe: 'body',
      responseType: 'text',
    };
  }
}