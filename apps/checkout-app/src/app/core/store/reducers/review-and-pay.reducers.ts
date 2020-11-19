import {
  IReviewAndPayState,
  initialReviewAndPayState,
} from './../state/review-and-pay.state';
import {
  EReviewAndPayActions,
  ReviewAndPayActions,
} from '../actions/review-and-pay.actions';
/**
 * This Review and Pay reducer responsible for handling transition from one state to next.
 * Depends on action type this reducer will handle these transitions.
 *
 * @param {*} [state=initialReviewAndPayState]
 * @param {ReviewAndPayActions} action
 * @returns {IReviewAndPayState}
 */
export const reviewAndPayReducers = (
  state = initialReviewAndPayState,
  action: ReviewAndPayActions
): IReviewAndPayState => {
  switch (action.type) {
    case EReviewAndPayActions.UpdateBillingInfoDetail: {
      return {
        ...state,
        billingInfo: action.payload,
      };
    }
    case EReviewAndPayActions.GetBillingInfoDetail: {
      return {
        ...state,
        billingInfo: action.payload,
      };
    }
    case EReviewAndPayActions.UpdateBillingAddressDetail: {
      return {
        ...state,
        billingAddress: action.payload,
      };
    }
    case EReviewAndPayActions.GetBillingAddressDetail: {
      return {
        ...state,
        billingAddress: action.payload,
      };
    }

    case EReviewAndPayActions.ValidateBin: {
      return {
        ...state,
        loading: true,
        binValidation: action.payload,
      };
    }
    case EReviewAndPayActions.ValidateBinSuccess: {
      return {
        ...state,
        loading: false,
        binValidation: action.payload,
      };
    }
    case EReviewAndPayActions.ValidateBinFailure: {
      return {
        ...state,
        loading: false,
        binValidation: action.payload,
      };
    }
    default:
      return state;
  }
};
