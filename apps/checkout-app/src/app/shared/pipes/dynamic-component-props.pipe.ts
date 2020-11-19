import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@core/store/state/app.state';
import { userState } from '@store/selectors/user.selectors';
import { CheckoutService } from '../services/checkout.service';
import { AppState } from '@orxe-sdk/app-state';
@Pipe({
  name: 'dynamicComponentProps',
})
export class DynamicComponentPropsPipe implements PipeTransform {
  userDetails$ = this._store.pipe(select(userState));
  // The Checkout Microapp routes and PageContext key mapping
  routePageContextMapping: any[] = [
    { route: '/trip-cart', pageContext: 'cartDetails' },
    { route: '/traveler-info', pageContext: 'consumerInfo' },
    { route: '/review-and-pay', pageContext: 'paymentAndReview' },
    { route: '/booking-confirmation', pageContext: 'confirmation' },
  ];
  private cultureParams: any = {
    lng: AppState.get('lng'),
    owner: environment.owner,
    cultureBaseUrl: environment.cultureBaseUrl,
    applicationId: environment.applicationId,
    sessionId: AppState.get('sessionId'),
  };
  private appData: any = {
    profiles: [],
  };
  private currentPage: any;
  constructor(
    public _store: Store<IAppState>,
    private _checkoutService: CheckoutService
  ) {
    this.currentPage = window.location?.pathname;
    this.userDetails$.subscribe((response) => {
      this.appData.profiles = response.userProfiles;
    });
  }

  transform(value: any, args?: { default: any[]; initial: any[] }): any {
    let obj: any = {};
    obj = this.createObject(obj, args?.default, this.cultureParams);
    obj = this.createObject(obj, args?.initial, value);
    return JSON.stringify(obj);
  }

  createObject(obj: any, array: any[], value: any) {
    if (array && array?.length > 0) {
      array.forEach((element: string) => {
        switch (element) {
          // profiles array prop, which will be help product component to bind with Select Profile Dropdown
          case 'profiles':
            obj[element] = this.appData[element];
            break;
          // pageContext prop, which will tell an extra info to the product component as where they are rendered
          case 'pageContext':
            obj[element] = {
              page: this._checkoutService.findObjectInArray(
                this.routePageContextMapping,
                'route',
                this.currentPage
              )?.pageContext,
              viewMode: 'online',
              allowedOperations: ['displayRpc', 'removeItem'],
            };
            break;
          // bookingInfo prop, will be Product traveler info component state and will be pass as a initial prop to review and pay screen component
          case 'bookingInfo':
            const formData = this._checkoutService.getTravelerFormDataByProduct(
              value?.id,
              value?.productType
            );
            if (formData) {
              obj[element] = formData;
            }
            break;
          default:
            value[element] ? (obj[element] = value[element]) : null;
            break;
        }
      });
    }
    return obj;
  }
}
