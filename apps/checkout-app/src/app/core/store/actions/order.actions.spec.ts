import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '../state/app.state';
import {
  GetCartOrder,
  OrderSuccess,
  OrderFailure,
  EOrderAction,
} from './order.actions';
describe('BookingAction', () => {
  let mockStore: MockStore<IAppState>;
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

  test('should dispatch GetCartOrder action', () => {
    const expectedAction = new GetCartOrder({ trackingid: '123456' });
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EOrderAction.GetOrder);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch OrderSuccess action', () => {
    const payload = require('../../../../assets/mock/order-summary-response-new.json');
    const expectedAction = new OrderSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EOrderAction.OrderSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch OrderFailure action', () => {
    const payload = new Error();
    const expectedAction = new OrderFailure(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EOrderAction.OrderFailure);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
