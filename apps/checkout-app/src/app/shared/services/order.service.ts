import { Injectable } from '@angular/core';
import Cart from '@orxe-checkout-sdk/cart';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly _cart: Cart) {}

  getBookingStatus(data) {
    return this._cart.orderOperations.getOrderStatus(data.trackingId);
  }

  getOrder(data) {
    return this._cart.orderOperations.getOrder(data.trackingId);
  }
  // order initiate
  orderInitiate(request) {
    return this._cart.orderOperations.placeOrder(request);
  }
}
