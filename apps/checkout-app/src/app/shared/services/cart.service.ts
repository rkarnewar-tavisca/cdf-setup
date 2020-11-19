import { Injectable } from '@angular/core';
import { selectUser } from '@store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import Cart from '@orxe-checkout-sdk/cart';
import { UserIdService } from './user-id.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Mock type and point balance for testing purpose
  user = { cartId: null, userId: null };
  constructor(
    private readonly _store: Store<IAppState>,
    private readonly _cart: Cart,
    private _userIdService: UserIdService
  ) {
    // TO DO - Will be implemented when userId will be retrieved from session
    // this._store.select(selectUserSession).subscribe((user: any) => {
    //   if (user && user.userId) {
    //     this.user.userId = user.userId;
    //   }
    // });
    // TO DO - To get userId from queryParams. Will be removed when userId is retrieved from session.
    this._store.select(selectUser).subscribe((user: any) => {
      if (user && user.id) {
        this.user.userId = user.id;
      }
    });
  }

  getCart() {
    return this._cart.getCart();
  }
  getPriceCart() {
    return this._cart.getPriceCart();
  }
  removeItemFromCart(reqObj) {
    return this._cart.deleteItemFromCart(reqObj);
  }
}
