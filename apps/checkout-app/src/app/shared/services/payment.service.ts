import { Injectable, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import Cart, {
  ApplyPaymentOptionRequest
} from '@orxe-checkout-sdk/cart';
import { selectCartDetail } from '../../core/store/selectors/cart.selectors';
import { ICartState } from '../../core/store/state/cart.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _cartState: ICartState;

  constructor(
    private readonly _store: Store<IAppState>,
    private readonly _cartSdk: Cart
  ) {
    this._store.select(selectCartDetail).subscribe((cart: ICartState) => {
      this._cartState = cart;
    });
  }

  applyPaymentOption(
    paymentOptions: ApplyPaymentOptionRequest
  ): Observable<any> {
    return this._cartSdk.paymentOperations.applyPaymentOption(
      paymentOptions
    );
  }
}
