import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrderService } from '@shared/services/order.service';
import {
  EBookingAction,
  BookingInitialize,
  GetBookingStatus,
  BookingStatusSuccess,
  BookingStatusFailure,
  BookingInitiateSuccess,
  BookingInitiateFailure,
} from '../actions/booking.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import {
  GetCartOrder,
  EOrderAction,
  OrderSuccess,
  OrderFailure,
} from '../actions/order.actions';
import { CheckoutService } from '@shared/services/checkout.service';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';

@Injectable()
export class OrderEffect {
  @Effect()
  OrderStatus$ = this._actions$.pipe(
    ofType<GetBookingStatus>(EBookingAction.GetBookingStatus),
    switchMap((data) => this._OrderService.getBookingStatus(data.payload)),
    map((cart: any) => new BookingStatusSuccess(cart)),
    catchError((error) => of(new BookingStatusFailure(error)))
  );
  @Effect()
  orderSummary = this._actions$.pipe(
    ofType<GetCartOrder>(EOrderAction.GetOrder),
    switchMap((data) => this._OrderService.getOrder(data.payload)),
    tap((data: any) => {
      this._checkoutService.performProductFilterOnCart(
        data,
        'productType',
        CHECKOUT_CONST.ADD_ON_PRODUCT
      );
    }),
    map((cart: any) => new OrderSuccess(cart)),
    catchError((error) => of(new OrderFailure(error)))
  );
  @Effect()
  OrderInitiate$ = this._actions$.pipe(
    ofType<BookingInitialize>(EBookingAction.BookingInitialize),
    switchMap((data: any) =>
      this._OrderService
        .orderInitiate(data.payload.request)
        .pipe(
          map((cart: any) => new BookingInitiateSuccess(cart)),
          catchError((error) => of(new BookingInitiateFailure(error)))
        )
    )
  );

  constructor(
    private _actions$: Actions,
    private _OrderService: OrderService,
    private _checkoutService: CheckoutService,
    private _store: Store<IAppState>
  ) {}
}
