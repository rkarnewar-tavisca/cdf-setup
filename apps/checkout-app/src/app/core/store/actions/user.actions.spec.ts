import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '../state/app.state';
import {
  GetUser,
  GetUserSuccess,
  UpdateUser,
  GetUserSession,
  GetUserSessionSuccess,
  EUserActions,
  UpdateUserPointsBalance,
  GetUserProfile,
  GetUserProfileSuccess,
  UpdateUserProfile,
  UpdateUserProfileSuccess,
  UpdateUserProfileFailure,
} from './user.actions';
import { UserSessionResponseInterface } from '@orxe-sdk/user-session';
import { Profile } from '@orxe-sdk/user-profile';
import { UserProfile } from '@orxe-checkout-sdk/cart';

describe('UserActions', () => {
  let mockStore: MockStore<IAppState>;
  const userSessionResponse = require('../../../../assets/mock/user-session-response.json');
  const userProfileResponse = require('../../../../assets/mock/user-profile-response.json');
  const travelerFormData = require('../../../../assets/mock/traveler-info-screen/traveler-form-data.json');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {},
        }),
      ],
    });

    mockStore = TestBed.inject(MockStore);
  });

  test('should dispatch GetUser action', () => {
    const expectedAction = new GetUser();
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EUserActions.GetUser);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch getCartDetailSuccess action', () => {
    const payload = {
      name: 'user',
      email: 'user@gmail.com',
      phone: '1231231230',
    };
    const expectedAction = new GetUserSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.GetUserSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateUser action', () => {
    const payload = {};
    const expectedAction = new UpdateUser(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.UpdateUser);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch GetUserSession action', () => {
    const expectedAction = new GetUserSession();
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EUserActions.GetUserSession);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch GetUserSessionSuccess action', () => {
    const payload: UserSessionResponseInterface = userSessionResponse;
    const expectedAction = new GetUserSessionSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.GetUserSessionSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch GetUserProfile action', () => {
    const expectedAction = new GetUserProfile();
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);
    expect(expectedAction.type).toEqual(EUserActions.GetUserProfile);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch GetUserProfileSuccess action', () => {
    const payload: UserProfile[] = userProfileResponse;
    const expectedAction = new GetUserProfileSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.GetUserProfileSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateUserPointsBalance action', () => {
    const expectedAction = new UpdateUserPointsBalance(5000);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.UpdateUserPointsBalance);
    expect(expectedAction.payload).toEqual(5000);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateUserProfile action', () => {
    const payload = travelerFormData;
    const expectedAction = new UpdateUserProfile(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.UpdateUserProfile);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateUserProfileSuccess action', () => {
    const payload: UserProfile[] = userProfileResponse;
    const expectedAction = new UpdateUserProfileSuccess(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.UpdateUserProfileSuccess);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should dispatch UpdateUserProfileFailure action', () => {
    const payload = { error: 'test error' };
    const expectedAction = new UpdateUserProfileFailure(payload);
    mockStore.dispatch = jest.fn();
    mockStore.dispatch(expectedAction);

    expect(expectedAction.type).toEqual(EUserActions.UpdateUserProfileFailure);
    expect(expectedAction.payload).toEqual(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
