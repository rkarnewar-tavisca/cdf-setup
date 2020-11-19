import { ErrorHandler, Injectable } from '@angular/core';
import {
  Effect,
  ofType,
  Actions,
  defaultEffectsErrorHandler,
} from '@ngrx/effects';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ValidationService } from '@shared/services/validation.service';
import {
  ValidateBin,
  ValidateBinSuccess,
  ValidateBinFailure,
  EReviewAndPayActions,
} from '../actions/review-and-pay.actions';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';

@Injectable()
export class ValidationEffects {
  @Effect()
  validateBin$ = this._actions$.pipe(
    ofType<ValidateBin>(EReviewAndPayActions.ValidateBin),
    switchMap((data) =>
      this._validationService.validateBin(data.payload.request)
    ),
    map((resp: any) => new ValidateBinSuccess(resp)),
    catchError((error) => of(new ValidateBinFailure(error)))
  );

  constructor(
    private _validationService: ValidationService,
    private _actions$: Actions
  ) {}
}
