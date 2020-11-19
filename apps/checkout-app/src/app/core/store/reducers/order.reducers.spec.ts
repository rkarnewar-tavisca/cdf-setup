import { OrderReducers } from './order.reducers';
import { initialOrderState } from '../state/get-order.state';
import { OrderSuccess, OrderFailure } from '../actions/order.actions';

describe('GetOrder', () => {
  const mockData = require('../../../../assets/mock/order-summary-response-new.json');
  const failMockData = require('../../../../assets/mock/booking-status-failure-response.json');

  test('should set and return default state if unknown action is passed', () => {
    const action = { type: 'NOOP' } as any;
    const reducerResponse = OrderReducers(undefined, action);
    expect(reducerResponse).toEqual(initialOrderState);
  });
  test('should set and return order summary if OrderSuccess action is passed', () => {
    const reducerResponse = OrderReducers(
      undefined,
      new OrderSuccess(mockData)
    );
    expect(reducerResponse).toEqual({
      order: mockData,
      loading: false,
    });
  });
  test('should return error if get order action is failed', () => {
    const reducerResponse = OrderReducers(
      undefined,
      new OrderFailure(failMockData)
    );
    expect(reducerResponse).toEqual({
      order: failMockData,
      loading: false,
    });
  });
});
