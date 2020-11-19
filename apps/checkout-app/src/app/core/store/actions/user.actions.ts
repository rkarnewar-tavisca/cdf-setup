import { Action } from '@ngrx/store';
import { IUser } from '@core/interfaces/index';
import { UserProfile } from '@orxe-checkout-sdk/cart';

/**
 * All user related Actions
 *
 * @export
 * @enum {actions}
 */

export enum EUserActions {
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  UpdateUser = '[User] Update User',
  GetUserSession = '[User] Get User Session',
  GetUserSessionSuccess = '[User] Get User Session Success',
  UpdateUserPointsBalance = '[User] Update User Point Balance',
  GetUserProfile = '[User] Get User Profile',
  GetUserProfileSuccess = '[User] Get User Profile Success',
  UpdateUserProfile = '[User] Update User Profile',
  UpdateUserProfileSuccess = '[User] Update User Profile Success',
  UpdateUserProfileFailure = '[User] Update User Profile Failure',
}

/**
 * Action class to get user information.
 *
 * @export
 * @class GetUser
 * @implements {Action}
 */
export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
}

/**
 * Action to dispatch when user data successfully fetched and update in current state
 *
 * @export
 * @class GetUserSuccess
 * @implements {Action}
 */
export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

/**
 * Action to get user session data from shell client.
 *
 * @export
 * @class GetUserSession
 * @implements {Action}
 */
export class GetUserSession implements Action {
  public readonly type = EUserActions.GetUserSession;
}

/**
 * Action to update user session data in current state.
 *
 * @export
 * @class GetUserSessionSuccess
 * @implements {Action}
 */
export class GetUserSessionSuccess implements Action {
  public readonly type = EUserActions.GetUserSessionSuccess;
  constructor(public payload: any) {}
}

/**
 * Action to get user profile data from cartSDK.
 *
 * @export
 * @class GetUserProfile
 * @implements {Action}
 */
export class GetUserProfile implements Action {
  public readonly type = EUserActions.GetUserProfile;
}

/**
 * Action to update user profile data in current state.
 *
 * @export
 * @class GetUserProfileSuccess
 * @implements {Action}
 */
export class GetUserProfileSuccess implements Action {
  public readonly type = EUserActions.GetUserProfileSuccess;
  constructor(public payload: UserProfile[]) {}
}

/**
 * Action to update user profile(s) within CartSDK.
 *
 * @export
 * @class UpdateUserProfile
 * @implements {Action}
 */
export class UpdateUserProfile implements Action {
  public readonly type = EUserActions.UpdateUserProfile;
  constructor(public payload: any) {}
}

/**
 * Action to update user profile data in current state
 * once information has been updated successfully in CartSDK
 *
 * @export
 * @class UpdateUserProfileSuccess
 * @implements {Action}
 */
export class UpdateUserProfileSuccess implements Action {
  public readonly type = EUserActions.UpdateUserProfileSuccess;
  constructor(public payload: UserProfile[]) {}
}

/**
 * Action to handle errors during the user profile update with the CartSDK
 *
 * @export
 * @class UpdateUserProfileFailure
 * @implements {Action}
 */
export class UpdateUserProfileFailure implements Action {
  public readonly type = EUserActions.UpdateUserProfileFailure;
  constructor(public payload: any) {}
}

/**
 * Update user type based on query parameter received for testing purpose
 *
 * @export
 * @class UpdateUser
 * @implements {Action}
 */
export class UpdateUser implements Action {
  public readonly type = EUserActions.UpdateUser;
  constructor(public payload: any) {}
}

/**
 * Update user point balance ONLY FOR TESTING PURPOSE
 *
 * @export
 * @class UpdateUserPointsBalance
 * @implements {Action}
 */
export class UpdateUserPointsBalance implements Action {
  public readonly type = EUserActions.UpdateUserPointsBalance;
  constructor(public payload: any) {}
}

export type UserActions =
  | GetUser
  | GetUserSuccess
  | UpdateUser
  | GetUserSession
  | GetUserSessionSuccess
  | UpdateUserPointsBalance
  | GetUserProfile
  | GetUserProfileSuccess
  | UpdateUserProfile
  | UpdateUserProfileSuccess
  | UpdateUserProfileFailure;
