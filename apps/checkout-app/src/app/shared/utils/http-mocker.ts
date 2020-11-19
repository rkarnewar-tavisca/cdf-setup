/**
 * @packageDocumentation
 * @module user-profile
 */
import { Http } from "@orxe-sdk/http";
import { of, throwError } from "rxjs";

/**
 * @hidden
 */
export class HttpMocker {
  static mock(funcName: "GET" | "PUT" | "DELETE" | "POST", returnData: any) {
    Http.prototype[funcName.toLowerCase()] = jest
      .fn()
      .mockImplementationOnce(() => {
        return of(returnData);
      });
  }

  static mockRejection(
    funcName: "GET" | "PUT" | "DELETE" | "POST",
    value: any
  ) {
    Http.prototype[funcName.toLowerCase()] = jest
      .fn()
      .mockImplementationOnce(() => {
        return throwError(value);
      })
  }

  static mockFunc(
    funcName: "GET" | "PUT" | "DELETE" | "POST",
    mockImpl: () => void
  ) {
    Http.prototype[funcName.toLowerCase()] = jest
      .fn()
      .mockImplementationOnce(mockImpl);
  }
}
