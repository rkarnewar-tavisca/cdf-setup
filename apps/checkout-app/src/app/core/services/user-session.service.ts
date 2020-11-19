import { Injectable } from '@angular/core';
import Cart from '@orxe-checkout-sdk/cart';
import { AppState } from '@orxe-sdk/app-state';
import { sessionRequest } from '../../../assets/mock/session-request';

@Injectable()
export class UserSessionService {

  constructor(private readonly _cart: Cart) {}

  /**
   * This method used to create session for checkout flow.
   *
   * @returns
   * @memberof UserSessionService
   */
  createCheckoutSession(clp) {
    return this._cart.sessionOperation.createSession(sessionRequest, clp);
  }
  setAppState(token) {
    const headers = {"orxe-sessionid": token}
    this._cart.setHeaders(headers);
    AppState.set("sessionId", token);
    sessionStorage.setItem("checkout-session", token);
  }
  addItemToCart(payload) {
    return this._cart.addToCart(payload);
  }
}
