import { Injectable } from '@angular/core';
import { Http } from '@orxe-sdk/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/index';
import { connect } from '@orxe-store/connect';
import Cart, { AddOrUpdateProfilesRequest, AddOrUpdateProfilesResponse } from '@orxe-checkout-sdk/cart';

const USER_PROFILE_URL = '../../../assets/user.json';

@Injectable()
export class UserService {
  private _http: Http = new Http();

  constructor(private readonly _cart: Cart) {}

  /**
   * This method used to get user profile information.
   *
   * @returns {Observable<IUser>}
   * @memberof UserService
   */
  getUser(): Observable<IUser> {
    return this._http.get<IUser>(USER_PROFILE_URL);
  }

  /**
   * This method is used to fetch user session data from shell client.
   *
   * @returns
   * @memberof UserService
   */
  getUserSession() {
    return connect('USER_SESSION');
  }

  /**
   * This method used to fetch user profile data from shell client.
   *
   * @returns
   * @memberof UserService
   */
  getUserProfile() {
    return this._cart.profileOperations.getProfiles();
  }

  /**
   * This method used to update user profiles in the cartSDK.
   *
   * @returns {Observable<AddOrUpdateProfilesResponse>}
   * @memberof UserService
   */
  updateUserProfiles(request: AddOrUpdateProfilesRequest): Observable<AddOrUpdateProfilesResponse> {
    return this._cart.profileOperations.addOrUpdateProfiles(request);
  }
}
