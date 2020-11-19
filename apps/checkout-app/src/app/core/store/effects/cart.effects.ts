import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CheckoutService } from '@shared/services/checkout.service';
import { CartService } from '@shared/services/cart.service';
import {
  ECartActions,
  GetCartDetail,
  GetPriceCartDetail,
  GetCartDetailSuccess,
  GetCartDetailFailure,
  UpdateCartDetail,
} from '../actions/cart.actions';
import { ICart } from '../../interfaces';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
// import mockCart from '../../../../assets/mock/review-screen/cart-single-product-clp.json';

@Injectable()
export class CartEffects {
  @Effect()
  getCartDetail$ = this._actions$.pipe(
    ofType<GetCartDetail>(ECartActions.GetCartDetail),
    switchMap(() => this._cartService.getCart()),
    tap((data: any) => {
      this._checkoutService.performProductFilterOnCart(
        data,
        'productType',
        CHECKOUT_CONST.ADD_ON_PRODUCT
      );
    }),
    map((cart: ICart) => new GetCartDetailSuccess(cart)),
    catchError((error) => of(new GetCartDetailFailure(error)))
  );
  @Effect()
  getPriceCartDetail$ = this._actions$.pipe(
    ofType<GetPriceCartDetail>(ECartActions.GetPriceCartDetail),
    switchMap((data) => this._cartService.getPriceCart()),
    tap((data: any) => {
      // data.items.push(mockCart.items[0]);
      this._checkoutService.performProductFilterOnCart(
        data,
        'productType',
        CHECKOUT_CONST.ADD_ON_PRODUCT
      );
    }),
    map((cart: ICart) => new GetCartDetailSuccess(cart)),
    catchError((error) => of(new GetCartDetailFailure(error)))
  );
  @Effect()
  updateCartDetail$ = this._actions$.pipe(
    ofType<UpdateCartDetail>(ECartActions.UpdateCartDetail),
    map((data: any) => {
      return this._checkoutService.performProductFilterOnCart(
        { ...data.payload },
        'productType',
        CHECKOUT_CONST.ADD_ON_PRODUCT
      );
    }),
    map((cart: ICart) => new GetCartDetailSuccess(cart)),
    catchError((error) => of(new GetCartDetailFailure(error)))
  );
  constructor(
    private _checkoutService: CheckoutService,
    private _actions$: Actions,
    private _cartService: CartService
  ) {}
}
