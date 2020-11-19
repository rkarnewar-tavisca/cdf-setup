import { reviewAndPayReducers } from './review-and-pay.reducers';
import { initialReviewAndPayState } from '../state/review-and-pay.state';
import {
  UpdateBillingInfoDetail,
  UpdateBillingAddressDetail,
  ValidateBin, ValidateBinSuccess, ValidateBinFailure
} from '../actions/review-and-pay.actions';

describe('Review And Pay Reducer', () => {
  const mockData = {
    errorCode: '',
    isValidBin: true,
    message: 'Bin validation was successful',
  };
  const mockFailData = {
    isValidBin: false,
    errorCode: 'NoSuchKey',
    message: 'The specified key does not exist.',
  };
  test('should set and return default state if unknown action is passed', () => {
    const action = { type: 'NOOP' } as any;
    const reducerResponse = reviewAndPayReducers(undefined, action);
    expect(reducerResponse).toEqual(initialReviewAndPayState);
  });

  test('should set and return UpdateBillingInfoDetail', () => {
    const reducerResponse = reviewAndPayReducers(
      undefined,
      new UpdateBillingInfoDetail({})
    );
    expect(reducerResponse).toEqual({
      billingAddress: null,
      billingInfo: {},
      loading: true,
      binValidation: null
    });
  });

  test('should set and return UpdateBillingAddressDetail', () => {
    const reducerResponse = reviewAndPayReducers(
      undefined,
      new UpdateBillingAddressDetail({})
    );
    expect(reducerResponse).toEqual({
      billingAddress: {},
      billingInfo: null,
      loading: true,
      binValidation: null
    });
  });

  test('should set and return binValidation if ValidateBin action is passed', () => {
    const reducerResponse = reviewAndPayReducers(undefined, new ValidateBin({}));
    expect(reducerResponse).toEqual({
      billingAddress: null,
      billingInfo: null,
      loading: true,
      binValidation: {}
    });
  });

  test('should set and return binValidation if ValidateBinSuccess action is passed', () => {
    const reducerResponse = reviewAndPayReducers(
      undefined,
      new ValidateBinSuccess(mockData)
    );
    expect(reducerResponse).toEqual({
      billingAddress: null,
      billingInfo: null,
      loading: false,
      binValidation: mockData
    });
  });

  test('should set and return binValidation if ValidateBinFailure action is passed', () => {
    const reducerResponse = reviewAndPayReducers(
      undefined,
      new ValidateBinFailure(mockFailData)
    );
    expect(reducerResponse).toEqual({
      billingAddress: null,
      billingInfo: null,
      loading: false,
      binValidation: mockFailData
    });
  });
});
