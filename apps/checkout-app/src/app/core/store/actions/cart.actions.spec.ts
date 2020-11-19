import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '../state/app.state';
import {
  GetCartDetail,
  GetCartDetailSuccess,
  GetCartDetailFailure,
  ECartActions,
  UpdateCLPEnabledFlow,
  UpdateCartDetail,
  GetPriceCartDetail,
  UpdatePaymentOption
} from './cart.actions';

describe('CartActions', () => {
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

  test('should dispatch getCartDetail action', () => {
    const expectedAction = new GetCartDetail();
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(ECartActions.GetCartDetail);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch GetPriceCartDetail action', () => {
    const expectedAction = new GetPriceCartDetail();
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(ECartActions.GetPriceCartDetail);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch getCartDetailSuccess action', () => {
    const payload = {};
    const expectedAction = new GetCartDetailSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(ECartActions.GetCartDetailSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch getCartDetailFailure action', () => {
    const payload = new Error();
    const expectedAction = new GetCartDetailFailure(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(ECartActions.GetCartDetailFailure);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateClpFlow action', () => {
    const payload = 'CLP';
    const expectedAction = new UpdateCLPEnabledFlow(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(ECartActions.UpdateCLPEnabledFlow);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch updateCartDetails action', () => {
    const payload = {};
    const expectedAction = new UpdateCartDetail(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(ECartActions.UpdateCartDetail);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
  test('should dispatch UpdatePaymentOption action', () => {
    const payload = {
      'redeemed': 'cash',
      'isAccordionOpen': true
    }
    const expectedAction = new UpdatePaymentOption(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(ECartActions.UpdatePaymentOption);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
