import { Injectable } from '@angular/core';
import Cart from '@orxe-checkout-sdk/cart';
@Injectable({
  providedIn: 'root'
})
export class PaymentSummaryService {
  public cartDetails;
  public user;
  constructor(private readonly _cart: Cart) { }

  setCartDetails(cartDetail) {
    this.cartDetails = cartDetail;
  }
  getCartDetails() {
    return this.cartDetails;
  }
  setUserDetails(userDetails) {
    this.user = userDetails;
  }
  applyPaymentOptions(req) {
    return this._cart.paymentOperations.applyPaymentOption(req);
  }
  applyPromoCode(promoCode) {
    const promoCodeReq = {
      code: promoCode,
      currency: this.cartDetails?.currency
    };
    return this._cart.paymentOperations.applyPromoCode(promoCodeReq);
  }

  removePromoCode(promoCode) {
    const removePromoReq = {
      code: promoCode,
      currency: this.cartDetails?.currency
    };
    return this._cart.paymentOperations.removePromoCode(removePromoReq);
  }
}
