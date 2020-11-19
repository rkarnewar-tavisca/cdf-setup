import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { OrderEffect } from './order.effects';
import { OrderService } from '@shared/services/order.service';
import { Actions } from '@ngrx/effects';
import { IAppState } from '../state/app.state';
import {
  GetCartOrder,
  OrderSuccess,
  OrderFailure,
} from '../actions/order.actions';
import {
  GetBookingStatus,
  BookingStatusSuccess,
  BookingStatusFailure,
  BookingInitialize,
  BookingInitiateSuccess,
  BookingInitiateFailure,
} from '../actions/booking.actions';
import { cold, hot } from 'jasmine-marbles';
import Cart from '@orxe-checkout-sdk/cart';

describe('OrderEffect', () => {
  let actions$: Observable<any>;
  let effects: OrderEffect;
  let mockStore: MockStore<IAppState>;
  let orderService: any;

  const mockData = require('src/assets/mock/get-order-status.response.json');
  const placeOrderReq = require('../../../../assets/mock/booking-initiate-request.json');
  const bookInitmockdata = require('../../../../assets/mock/booking-initiate-response.json');
  const getOrderMockData = require('../../../../assets/mock/order-summary-response-new.json');
  beforeEach(() => {
    jest.setTimeout(10000);
    TestBed.configureTestingModule({
      providers: [
        OrderEffect,
        Actions,
        {
          provide: OrderService,
          useValue: {
            getBookingStatus: jest.fn(),
            orderInitiate: jest.fn(),
            getOrder: jest.fn(),
          },
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
        { provide: Cart },
      ],
    });

    effects = TestBed.inject(OrderEffect);
    mockStore = TestBed.inject(MockStore);
    orderService = TestBed.inject(OrderService);
  });

  test('should be created', () => {
    expect(effects).toBeTruthy();
  });

  test('should return a booking status stream with BookingStatusSuccess action', () => {
    const orderStatus = mockData;
    const action = new GetBookingStatus({ trackingId: '123' });
    const outcome = new BookingStatusSuccess(orderStatus);

    // Dispatch getbookingstatus action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: orderStatus });
    const expected = cold('--b', { b: outcome });
    orderService.getBookingStatus.mockReturnValue(response);
    expect(effects.OrderStatus$).toBeObservable(expected);
  });
  test('should return a bookingInitiate success stream with bookingInitiateSuccess action', () => {
    const orderInitSuccess = bookInitmockdata;
    const action = new BookingInitialize({
      request: placeOrderReq,
      cartid: '17841261170878950',
    });
    const outcome = new BookingInitiateSuccess(orderInitSuccess);

    // Dispatch BookingInitiate action after 10 frames
    actions$ = hot('-a', {
      a: action,
    });
    const res = cold('-a|', {
      a: orderInitSuccess,
    });
    const exp = cold('--b', {
      b: outcome,
    });
    orderService.orderInitiate.mockReturnValue(res);
    expect(effects.OrderInitiate$).toBeObservable(exp);
  });

  test('should return order success stream with orderSuccess action ', () => {
    const orderSuccess = getOrderMockData;
    const action = new GetCartOrder({ trackingId: '123212' });
    const outcome = new OrderSuccess(orderSuccess);

    // Dispatch GetCartOrder action after 10 frames
    actions$ = hot('-a', {
      a: action,
    });
    const res = cold('-a|', {
      a: orderSuccess,
    });
    const exp = cold('--b', {
      b: outcome,
    });
    orderService.getOrder.mockReturnValue(res);
    expect(effects.orderSummary).toBeObservable(exp);
  });
  test('should return a BookingStatusFailure action on failure', () => {
    const orderStatus = mockData;
    const action = new GetBookingStatus({ trackingId: '123' });
    const error = new Error();
    const outcome = new BookingStatusFailure(error);
    // Dispatch BookingStatusFailure action
    actions$ = hot('-a', {
      a: action,
    });
    const response = cold('-#|', {}, error);
    const expected = cold('--(b|)', {
      b: outcome,
    });
    orderService.getBookingStatus.mockReturnValue(response);
    expect(effects.OrderStatus$).toBeObservable(expected);
  });
  test('should return a BookingInitiateFailure action on failure', () => {
    const orderInitSuccess = bookInitmockdata;
    const action = new BookingInitialize({
      request: placeOrderReq,
      cartid: '17841261170878950',
    });
    const error = new Error();
    const outcome = new BookingInitiateFailure(error);
    // Dispatch BookingInitiateFailure action
    actions$ = hot('-a', {
      a: action,
    });
    const response = cold('-#|', {}, error);
    const expected = cold('--(b|)', {
      b: outcome,
    });
    orderService.orderInitiate.mockReturnValue(response);
    effects.OrderInitiate$.subscribe(
      () => {},
      (err) => {
        expect(err).toBeObservable(expected);
      }
    );
  });

  test('should return a OrderFailure action on failure', () => {
    const orderSuccess = mockData;
    const action = new GetCartOrder({ trackingId: '123212' });
    const error = new Error();
    const outcome = new OrderFailure(error);
    // Dispatch OrderFailure action
    actions$ = hot('-a', {
      a: action,
    });
    const response = cold('-#|', {}, error);
    const expected = cold('--(b|)', {
      b: outcome,
    });
    orderService.getOrder.mockReturnValue(response);
    expect(effects.orderSummary).toBeObservable(expected);
  });
});
