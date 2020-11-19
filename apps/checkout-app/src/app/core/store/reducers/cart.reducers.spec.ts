import { cartReducers } from './cart.reducers';
import { initialCartState } from '../state/cart.state';
import {
  GetCartDetailSuccess,
  UpdateCLPEnabledFlow,
  GetCartDetail,
  UpdateCartDetail,
  GetCartDetailFailure,
  GetPriceCartDetail,
  UpdatePaymentOption
} from '../actions/cart.actions';

describe('Cart Reducer', () => {
  const mockData = require('src/assets/mock/get-cart.json');
  const mockFailData = {
    code: '726',
    info: [],
    message: 'No active cart found for user'
  };
  test('should set and return default state if unknown action is passed', () => {
    const action = { type: 'NOOP' } as any;
    const reducerResponse = cartReducers(undefined, action);
    expect(reducerResponse).toEqual(initialCartState);
  });

  test('should set and return cart details if GetCartDetail action is passed', () => {
    const reducerResponse = cartReducers(undefined, new GetCartDetail());
    expect(reducerResponse).toEqual({
      cartInfo: {
        cartDetails: null
      },
      loading: true
    });
  });
  test('should set and return price cart details if GetPriceCartDetail action is passed', () => {
    const reducerResponse = cartReducers(undefined, new GetPriceCartDetail());
    expect(reducerResponse).toEqual({
      cartInfo: {
        cartDetails: null
      },
      loading: true
    });
  });

  test('should set and return cart details if GetCartDetailSuccess action is passed', () => {
    const reducerResponse = cartReducers(
      undefined,
      new GetCartDetailSuccess(mockData)
    );
    expect(reducerResponse).toEqual({
      cartInfo: {
        cartDetails: mockData
      },
      loading: false
    });
  });

  test('should set and return cart details if GetCartDetailFailure action is passed', () => {
    const reducerResponse = cartReducers(
      undefined,
      new GetCartDetailFailure(mockFailData)
    );
    expect(reducerResponse).toEqual({
      cartInfo: {
        cartDetails: mockFailData
      },
      loading: false
    });
  });

  test('should set and return clpFlow if UpdateClpFlow action is passed', () => {
    const reducerResponse = cartReducers(
      undefined,
      new UpdateCLPEnabledFlow('CLP')
    );
    expect(reducerResponse).toEqual({
      cartInfo: {
        clpEnabled: 'CLP'
      },
      loading: true
    });
  });

  test('should set and return cart details if UpdateCartDetail action is passed', () => {
    const reducerResponse = cartReducers(
      undefined,
      new UpdateCartDetail(mockData)
    );
    expect(reducerResponse).toEqual({
      cartInfo: {
        cartDetails: mockData
      },
      loading: false
    });
  });

  test('should set and return cart details if UpdatePaymentOption action is passed', () => {
    const paymentOptMock = {
      'redeemed': 'cash',
      'isAccordionOpen': true
    }
    const reducerResponse = cartReducers(
      undefined,
      new UpdatePaymentOption(paymentOptMock)
    );
    expect(reducerResponse).toEqual({
      cartInfo: {
        paymentOption: paymentOptMock
      },
      loading: true
    });
  });
});
