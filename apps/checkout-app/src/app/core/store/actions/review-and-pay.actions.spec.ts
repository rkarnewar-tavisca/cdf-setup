import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '../state/app.state';
import {
  UpdateBillingInfoDetail,
  GetBillingInfoDetail,
  UpdateBillingAddressDetail,
  GetBillingAddressDetail,
  EReviewAndPayActions,
  ValidateBin,
  ValidateBinSuccess,
  ValidateBinFailure
} from './review-and-pay.actions';

describe('Review and Pay Actions', () => {
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

  test('should dispatch UpdateBillingInfoDetail action', () => {
    const payload = {};
    const expectedAction = new UpdateBillingInfoDetail(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(
      EReviewAndPayActions.UpdateBillingInfoDetail
    );
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateBillingAddressDetail action', () => {
    const payload = {};
    const expectedAction = new UpdateBillingAddressDetail(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(
      EReviewAndPayActions.UpdateBillingAddressDetail
    );
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch GetBillingInfoDetail action', () => {
    const payload = {};
    const expectedAction = new GetBillingInfoDetail(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(
      EReviewAndPayActions.GetBillingInfoDetail
    );
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch GetBillingAddressDetail action', () => {
    const payload = {};
    const expectedAction = new GetBillingAddressDetail(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(
      EReviewAndPayActions.GetBillingAddressDetail
    );
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch ValidateBin action', () => {
    const payload = {};
    const expectedAction = new ValidateBin(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(
      EReviewAndPayActions.ValidateBin
    );
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch ValidateBinSuccess action', () => {
    const payload = {};
    const expectedAction = new ValidateBinSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EReviewAndPayActions.ValidateBinSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch ValidateBinFailure action', () => {
    const payload = new Error();
    const expectedAction = new ValidateBinFailure(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EReviewAndPayActions.ValidateBinFailure);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
