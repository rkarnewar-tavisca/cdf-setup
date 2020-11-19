import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { CheckoutService } from '@shared/services/checkout.service';
import { UserService } from '../../services/user.service';
import { Actions } from '@ngrx/effects';
import { IAppState } from '../state/app.state';
import { GetUser, GetUserSuccess, GetUserSession, GetUserSessionSuccess, GetUserProfile, GetUserProfileSuccess } from '../actions/user.actions';
import { cold, hot } from 'jasmine-marbles';
import { UserEffects } from './user.effects';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let mockStore: MockStore<IAppState>;
  let checkOutService: any;
  let userService: any;

  const userSessionResponse = require('../../../../assets/mock/user-session-response.json');
  const userDetails = { name: 'user', email: 'user@gmail.com', phone: '1231231230' };

  const userProfileResponse = require('../../../../assets/mock/user-profile-response.json');

  const userSessionMock = {
    state: {
      userSessionDetails: userSessionResponse
    }
  };

  const userProfileMock = userProfileResponse;

  beforeEach(() => {
    jest.setTimeout(10000);
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        Actions,
        {
          provide: CheckoutService,
          useValue: {
            performProductFilterOnCart: jest.fn()
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn(),
            getUserSession: jest.fn(),
            getUserProfile: jest.fn()
          },
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
      ],
    });

    effects = TestBed.inject(UserEffects);
    mockStore = TestBed.inject(MockStore);
    checkOutService = TestBed.inject(CheckoutService);
    userService = TestBed.inject(UserService);
  });

  test('should be created', () => {
    expect(effects).toBeTruthy();
  });

  test('should return a user data stream with GetUserSuccess action', () => {
    const action = new GetUser();
    const outcome = new GetUserSuccess(userDetails);

    // Dispatch GetUser action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: userDetails });
    const expected = cold('--b', { b: outcome });
    userService.getUser.mockReturnValue(response);
    expect(effects.getUser$).toBeObservable(expected);
  });

  test('should return a user session data stream with GetUserSuccess action', () => {
    const action = new GetUserSession();
    const outcome = new GetUserSessionSuccess(userSessionResponse);

    // Dispatch GetUserSession action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: userSessionMock });
    const expected = cold('--b', { b: outcome });
    userService.getUserSession.mockReturnValue(response);
    expect(effects.getUserSession$).toBeObservable(expected);
  });

  test('should return a user profile data stream with GetUserProfileSuccess action', () => {
    const action = new GetUserProfile();
    const outcome = new GetUserProfileSuccess(userProfileResponse);

    // Dispatch GetUserProfileSuccess action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: userProfileMock });
    const expected = cold('--b', { b: outcome });
    console.log(response);
    userService.getUserProfile.mockReturnValue(response);
    expect(effects.getUserProfiles$).toBeObservable(expected);
  });
});
