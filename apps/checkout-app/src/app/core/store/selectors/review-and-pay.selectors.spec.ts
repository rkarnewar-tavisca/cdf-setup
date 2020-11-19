import {
  selectBinResponse,
  selectReviewAndPay,
} from './review-and-pay.selectors';
import { initialReviewAndPayState } from '../state/review-and-pay.state';

const initialReviewState = {
  billingInfo: null,
  billingAddress: null,
  loading: true,
  binValidation: null,
};

describe('Review And Pay Screen', () => {
  test('should return review and pay state', () => {
    expect(selectReviewAndPay.projector(initialReviewState)).toEqual(
      initialReviewAndPayState
    );
    expect(selectBinResponse.projector(initialReviewState)).toBeNull();
  });

  test('should return binValidation state when set', () => {
    const newState = { ...initialReviewState };
    newState.binValidation = { isValidBin: true };
    expect(selectBinResponse.projector(newState)).toEqual({ isValidBin: true });
  });
});
