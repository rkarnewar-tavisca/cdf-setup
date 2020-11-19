import {
  TravelerInfoActions,
  ETravelerInfoActions,
} from '../actions/traveler-info.actions';
import {
  initialTravelerInfoState,
  ITravelerInfoState,
} from './../state/traveler-info.state';

/**
 * This Traveler info reducer responsible for handling transition from one state to next.
 * Depends on action type this reducer will handle these transitions.
 *
 * @param {*} [state=initialTravelerInfoState]
 * @param {TravelerInfoActions} action
 * @returns {ITravelerInfoState}
 */
export const travelerInfoReducers = (
  state = initialTravelerInfoState,
  action: TravelerInfoActions
): ITravelerInfoState => {
  switch (action.type) {
    case ETravelerInfoActions.UpdateTravelerContactDetail: {
      return {
        ...state,
        contactFormData: action.payload,
      };
    }
    case ETravelerInfoActions.GetTravelerContactDetail: {
      return {
        ...state,
        contactFormData: action.payload,
      };
    }
    case ETravelerInfoActions.UpdateTravelerDetail: {
      return {
        ...state,
        travelerInfoFormData: action.payload,
      };
    }
    case ETravelerInfoActions.UpdateProductParticipant: {
      let formData;
      if (Array.isArray(state.travelerInfoFormData)) {
        formData = JSON.parse(JSON.stringify(state.travelerInfoFormData));

        if (Array.isArray(action.payload) && Array.isArray(formData)) {
          action.payload.forEach((productProfile) => {
            const index = formData.findIndex(
              (data) =>
                data.id === productProfile.product.id &&
                data.productType === productProfile.product.type
            );

            if (index > -1) {
              formData[index].info = JSON.parse(productProfile.productParticipantBlob);
            }
          });
        }
      }
      return {
        ...state,
        travelerInfoFormData: { ...formData },
      };
    }

    default:
      return state;
  }
};
