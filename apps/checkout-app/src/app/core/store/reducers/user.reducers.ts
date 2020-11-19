import { UserActions, EUserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from './../state/user.state';

/**
 * This user reducer responsible for handling transition from one state to next.
 * Depends on action type this reducer will handle these transitions.
 *
 * @param {*} [state=initialUserState]
 * @param {UserActions} action
 * @returns {IUserState}
 */
export const userReducers = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {

    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    case EUserActions.UpdateUser: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          id: action.payload.userId
        }
      };
    }

    case EUserActions.GetUserSessionSuccess: {
      return {
        ...state,
        userSession: action.payload
      };
    }

    case EUserActions.UpdateUserPointsBalance: {
      return {
        ...state,
        userSession: {
          ...state.userSession,
          programCurrency: {
            ...state.userSession.programCurrency,
            value: action.payload
          }
        }
      };
    }

    case EUserActions.GetUserProfile: {
      return {
        ...state,
        loading: true
      }
    }

    case EUserActions.GetUserProfileSuccess:
    case EUserActions.UpdateUserProfileSuccess:   {
      return {
        ...state,
        userProfiles: action.payload,
        loading: false
      }
    }

    case EUserActions.UpdateUserProfile: {
      return {
        ...state,
        loading: true
      }
    }

    default:
      return state;
  }
};
