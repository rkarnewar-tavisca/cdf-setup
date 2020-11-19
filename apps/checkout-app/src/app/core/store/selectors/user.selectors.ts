import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IUserState } from '../state/user.state';


export const userState = (state: IAppState) => state.user;

/**
 * Selector functions help query the state easily. 
 * Multiple selectors can be combined to pick a desired state.
 * This selector provide the user state.
 */
export const selectUser = createSelector(
  userState,
  (state: IUserState) => state.currentUser
);


/**
 * This selector provides the user session slice of user state.
 */
export const selectUserSession = createSelector(
  userState,
  (state: IUserState) => state.userSession
);

/**
 * This selector provides the user profiles slice of user state.
 */
export const selectUserProfile = createSelector(
  userState,
  (state: IUserState) => state.userProfiles
);

