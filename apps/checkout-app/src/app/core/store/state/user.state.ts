import { IUser } from '@core/interfaces/index';
import { UserProfile } from '@orxe-checkout-sdk/cart';

/**
 * User state contract defination
 *
 * @export
 * @interface IUserState
 */
export interface IUserState {
  currentUser: IUser;
  userSession: any;
  userProfiles: UserProfile[];
  loading: boolean;
}

/**
 * Initial user state defination.
 *
 * @export
 */
export const initialUserState: IUserState = {
  currentUser: null,
  userSession: null,
  userProfiles: null,
  loading: null
};
