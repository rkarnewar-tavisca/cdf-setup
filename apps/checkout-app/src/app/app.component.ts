import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// NGRX Imports
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import {
  GetUser,
  UpdateUser,
  GetUserSession,
  GetUserProfile,
} from '@store/actions/user.actions';
import { selectUser, selectUserSession } from '@store/selectors/user.selectors';
import { UpdateUserPointsBalance } from '@store/actions/user.actions';
import { Subscription } from 'rxjs';
import { CheckoutService } from './shared/services/checkout.service';
import { cultureCoreInit } from '@orxe-culture/angular';
import { environment } from '@env/environment';
import translation from '../assets/locales/culture/en-US.json';
import translationES from '../assets/locales/culture/en-ES.json';
import translationPT from '../assets/locales/culture/en-PT.json';
import { UserIdService } from './shared/services/user-id.service';
import { AppState } from '@orxe-sdk/app-state';
import { Logger } from '@orxe-sdk/logging';
import Cart from '@orxe-checkout-sdk/cart';
import { UserSessionService } from '@core/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  // Gets updated automatically when GetUserSuccess action completes by the effect
  user$ = this._store.select(selectUser);
  userSession$ = this._store.select(selectUserSession);
  subscription = new Subscription();
  clp_userId: string = null;
  // Culture Required param will be input from Shell app
  isInitialized = false;
  @Input() lng = 'en-US';
  @Input() owner: string = environment.owner;
  @Input() cultureBaseUrl = environment.cultureBaseUrl;
  @Input() applicationId = environment.applicationId;

  constructor(
    private router: Router,
    private _store: Store<IAppState>,
    private _route: ActivatedRoute,
    private _checkoutService: CheckoutService,
    private _userIdService: UserIdService,
    private readonly _cart: Cart,
    private _userSessionService: UserSessionService
  ) { }

  ngOnInit() {
    // Calling GetUserSession to get user session related data.
    this._store.dispatch(new GetUserSession());

    this._store.dispatch(new GetUserProfile());
   // To Do - need to remove when we pass default token from SDK
    this._checkoutService.setHeaders('cnx-environment-token', 'qa');
    
    // Calls GetUser action to fetch user from service, in turn invoking an effect
    this._store.dispatch(new GetUser());
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const initialParams = this._route.snapshot.queryParams;
          const userId = initialParams?.userId;
          const agentId = initialParams?.agentId;
          const pointBalance = +initialParams?.pointBalance;
          const tenantId = initialParams?.tenantId;
          const correlationId = initialParams?.correlationId;
          const envToken = initialParams?.envToken;
          const sId = initialParams?.sid;
          let sessionUserId = this._userIdService.getUserId();
          if (userId) {
            this._userIdService.storeUserId(userId);
            this._store.dispatch(new UpdateUser({ userId }));
          } else if (
            !userId &&
            (event.url.includes('/trip-cart') || event.url.includes('/'))
          ) {
            this._userIdService.storeUserId(null);
          } else if (sessionUserId) {
            this._store.dispatch(new UpdateUser({ userId: sessionUserId }));
          }
          if (agentId) {
            this._checkoutService.agentId = agentId;
          }
          if (tenantId) {
            AppState.set('cnxTenantId', tenantId);
            this._checkoutService.setHeaders('cnx-tenantid', tenantId);
          }
          if (correlationId) {
            this._checkoutService.setHeaders('cnx-correlationId', correlationId);
          }
          if (envToken) {
            this._checkoutService.setHeaders('cnx-environment-token', envToken);
          }
          if (sId) {
            this._userSessionService.setAppState(sId)
          } else if (window.location.pathname !== '/trip-cart'){
            AppState.set("sessionId", sessionStorage.getItem("checkout-session"));
            this._checkoutService.setHeaders("orxe-sessionid", sessionStorage.getItem("checkout-session"));
          } else {
            sessionStorage.removeItem("checkout-session");
          }

          // TODO - For now we are using query param to switch culture
          this.lng = initialParams?.culture ? initialParams.culture : this.lng;
          AppState.set('lng', this.lng);
          this.initializeCulture();
          /**
           * NOTE : this setTimeout call is just for testing purpose. we will remove it later.
           * For testing we are updating pointsBalance from browser URL query Param
           * setting query param from browser will refreshes application
           * and before application state set we can't dispatch UpdateUserPointsBalance
           * and if we try to solve this problem using @effects it will create infinite loop
           * so to handle this async call for testing used setTimeout
           *
           */
          if (pointBalance) {
            setTimeout(() => {
              this._store.dispatch(new UpdateUserPointsBalance(pointBalance));
            }, 5000);
          }
        }
      })
    );

  }
  private initializeCulture() {
    // TODO - For now Implemented multiple culture using local culture files
    let resources: any;
    if (this.lng === 'en-ES') {
      resources = { 'en-ES': { translation: translationES } };
    } else if (this.lng === 'en-PT') {
      resources = { 'en-PT': { translation: translationPT } };
    } else {
      resources = { 'en-US': { translation } };
    }
    cultureCoreInit({
      resources: !environment.production ? resources : {}, // We will be fetching resources from CDN in production
      debug: environment.production,
      willFetchResources: true,
      production: environment.production,
      applicationId: this.applicationId,
      cultureBaseUrl: this.cultureBaseUrl,
      owner: this.owner,
      lng: this.lng,
      category: 'app',
      nameSpace: environment.nameSpace,
      tagName: 'orxe-checkout-app',
    })
      .then(() => {
        this.isInitialized = true;
      })
      .catch(() => {
        // Handle Error
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
