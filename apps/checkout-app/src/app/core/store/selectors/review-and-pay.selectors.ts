import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IReviewAndPayState } from '../state/review-and-pay.state';

export const reviewAndPayState = (state: IAppState) => state.reviewAndPay;

/**
 * Selector functions help query the state easily.
 * Multiple selectors can be combined to pick a desired state
 */
export const selectReviewAndPay = createSelector(
  reviewAndPayState,
  (state: IReviewAndPayState) => state
);

/**
 * Bin response selector
 */
export const selectBinResponse = createSelector(
  selectReviewAndPay,
  (state: IReviewAndPayState) => state.binValidation
);
