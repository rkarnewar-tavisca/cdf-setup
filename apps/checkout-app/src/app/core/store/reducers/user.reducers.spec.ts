import { userReducers } from './user.reducers';
import { initialUserState } from '../state/user.state';
import {
  GetUserSessionSuccess,
  UpdateUser,
  GetUserSuccess,
  UpdateUserPointsBalance,
  GetUserProfile,
  GetUserProfileSuccess,
} from '../actions/user.actions';

describe('User Reducers', () => {
  const userSessionResponse = require('../../../../assets/mock/user-session-response.json');
  const updatedUserSession = require('../../../../assets/mock/updated-user-session-reponse.json');
  const userDetails = {
    name: 'user',
    email: 'user@gmail.com',
    phone: '1231231230',
  };
  const updateUserState = { userId: 'test' };
  const updatedUserState = { id: 'test' };
  const userProfileResponse = require('../../../../assets/mock/user-profile-response.json');

  test('should set and return default state if unknown action is passed', () => {
    const action = { type: 'NOOP' } as any;
    const reducerResponse = userReducers(undefined, action);
    expect(reducerResponse).toEqual(initialUserState);
  });

  test('should set and return current user info if GetUserSuccess action is passed', () => {
    const reducerResponse = userReducers(
      undefined,
      new GetUserSuccess(userDetails)
    );
    expect(reducerResponse).toEqual({
      currentUser: userDetails,
      userSession: null,
      loading: null,
      userProfiles: null,
    });
  });

  test('should update and return current user info if UpdateUser action is passed', () => {
    const reducerResponse = userReducers(
      undefined,
      new UpdateUser(updateUserState)
    );
    expect(reducerResponse).toEqual({
      currentUser: updatedUserState,
      userSession: null,
      loading: null,
      userProfiles: null,
    });
  });

  test('should set and return current user session info if GetUserSessionSuccess action is passed', () => {
    const reducerResponse = userReducers(
      undefined,
      new GetUserSessionSuccess(userSessionResponse)
    );
    expect(reducerResponse).toEqual({
      currentUser: null,
      userSession: userSessionResponse,
      loading: null,
      userProfiles: null,
    });
  });

  test('should update the available point balance if UpdateUserPointsBalance action is passed', () => {
    const userState = {
      currentUser: null,
      userSession: userSessionResponse,
      loading: null,
      userProfiles: null,
    };

    const reducerResponse = userReducers(
      userState,
      new UpdateUserPointsBalance(60000)
    );

    expect(reducerResponse).toEqual({
      currentUser: null,
      userSession: updatedUserSession,
      loading: null,
      userProfiles: null,
    });
  });

  test('should set and return current loading true if GetUserProfile action is passed', () => {
    const reducerResponse = userReducers(undefined, new GetUserProfile());
    expect(reducerResponse).toEqual({
      currentUser: null,
      userSession: null,
      userProfiles: null,
      loading: true,
    });
  });

  test('should set and return current user profile info if GetUserProfileSuccess action is passed', () => {
    const reducerResponse = userReducers(
      undefined,
      new GetUserProfileSuccess(userProfileResponse)
    );
    expect(reducerResponse).toEqual({
      currentUser: null,
      userSession: null,
      loading: false,
      userProfiles: userProfileResponse,
    });
  });
});
