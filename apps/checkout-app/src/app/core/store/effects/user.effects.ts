import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IUser } from '@core/interfaces';
import { UserService } from '@core/services';
import {
  EUserActions,
  GetUser,
  GetUserSuccess,
  GetUserSession,
  GetUserSessionSuccess,
  GetUserProfile,
  GetUserProfileSuccess,
  UpdateUserProfileFailure,
  UpdateUserProfile,
  UpdateUserProfileSuccess,
} from '../actions/user.actions';
import { AddOrUpdateProfilesRequest, AddOrUpdateProfilesResponse, UserProfile } from '@orxe-checkout-sdk/cart';
import { UpdateProductParticipant } from '../actions/traveler-info.actions';

/**
 * Effects listen for user related actions changes and reacts on it.
 *
 * @export
 * @class UserEffects
 */
@Injectable()
export class UserEffects {
  /**
   * Effect used for external interaction to get user state.
   *
   * @memberof UserEffects
   */
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    switchMap(() => this._userService.getUser()),
    switchMap((user: IUser) => {
      return of(new GetUserSuccess(user));
    })
  );

  /**
   * Effect for external interaction to shell client to get user session state.
   *
   * @memberof UserEffects
   */
  @Effect()
  getUserSession$ = this._actions$.pipe(
    ofType<GetUserSession>(EUserActions.GetUserSession),
    switchMap(() => this._userService.getUserSession()),
    switchMap((data: any) => {
      return of(new GetUserSessionSuccess(data.state.userSessionDetails));
    }),
    catchError((error) => {
      // TO DO, once we get case to handle errors from session SDK
      console.log(error);
      return of(0);
    })
  );

  /**
   * Effect for external interaction with CartSDK to get profile data.
   *
   * @memberof UserEffects
   */
  @Effect()
  getUserProfiles$ = this._actions$.pipe(
    ofType<GetUserProfile>(EUserActions.GetUserProfile),
    switchMap(() => this._userService.getUserProfile()),
    switchMap((data: any) => {
      return of(new GetUserProfileSuccess(data));
    }),
    catchError((error) => {
      // TO DO, once we get case to handle errors from profile SDK
      console.log(error);
      return of(0);
    })
  );

  /**
   * Effect for external interaction with CartSDK to update User profiles.
   *
   * @memberof UserEffects
   */
  @Effect()
  updateUserProfiles$ = this._actions$.pipe(
    ofType<UpdateUserProfile>(EUserActions.UpdateUserProfile),
    map((data: any) => {
      return this.getUpdateUserProfilesRequest(data);
    }),
    switchMap((request: AddOrUpdateProfilesRequest) =>
      this._userService.updateUserProfiles(request)
    ),
    switchMap((response: AddOrUpdateProfilesResponse) => [
      new UpdateUserProfileSuccess(response.profiles),
      new UpdateProductParticipant(response.productParticipants)
    ]),
    catchError((error) => {
      // TO DO, once we get case to handle errors from profile SDK
      console.log(error);
      return of(new UpdateUserProfileFailure(error));
    })
  );

  /**
   * constructor used to inject UserService and action which can be used in Effects
   *
   * @param {UserService} _userService
   * @param {Actions} _actions$
   * @memberof UserEffects
   */
  constructor(private _userService: UserService, private _actions$: Actions) {}

  private getUpdateUserProfilesRequest(data: any) {
    const request: AddOrUpdateProfilesRequest = {
      profiles: data.payload.selectedProfiles,
      productParticipant: {
        product: {
          id: data.payload.id,
          type: data.payload.productType,
        },
        productParticipantBlob: data.payload.bookingInfo
      }
    };
    return request;
  }
}
