import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '../state/app.state';
import {
  GetBookingStatus,
  BookingStatusSuccess,
  BookingStatusFailure,
  EBookingAction,
  BookingInitialize,
  BookingInitiateSuccess,
  BookingInitiateFailure,
} from './booking.actions';
describe('BookingAction', () => {
  let mockStore: MockStore<IAppState>;
  const userSessionResponse = require('../../../../assets/mock/get-order-status.response.json');
  const placeOrderReq = require('../../../../assets/mock/booking-initiate-request.json');
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {},
        }),
      ],
    });

    mockStore = TestBed.inject(MockStore);
  });

  test('should dispatch getBookingStatus action', () => {
    const expectedAction = new GetBookingStatus({ trackingid: '123456' });
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EBookingAction.GetBookingStatus);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch BookingInitiate action', () => {
    const expectedAction = new BookingInitialize({
      request: placeOrderReq,
      cartid: '17841261170878950',
    });
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EBookingAction.BookingInitialize);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch BookingStatusSuccess action', () => {
    const payload = require('../../../../assets/mock/get-order-status.response.json');
    const expectedAction = new BookingStatusSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EBookingAction.BookingStatusSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch BookingInitiateSuccess action', () => {
    const payload = require('../../../../assets/mock/booking-initiate-response.json');
    const expectedAction = new BookingInitiateSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EBookingAction.BookingInitiateSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch BookingStatusFailure action', () => {
    const payload = new Error();
    const expectedAction = new BookingStatusFailure(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EBookingAction.BookingStatusFailure);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch BookingInitiateFailure action', () => {
    const payload = new Error();
    const expectedAction = new BookingInitiateFailure(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EBookingAction.BookingInitiateFailure);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
