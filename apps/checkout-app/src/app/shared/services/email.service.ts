import { Injectable } from '@angular/core';
import Cart from '@orxe-checkout-sdk/cart';
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private readonly _cart: Cart) {}
  shareItinerary(userInfo) {
    return this._cart.shareItineraryOperations.shareItinerary(userInfo);
  }
}
