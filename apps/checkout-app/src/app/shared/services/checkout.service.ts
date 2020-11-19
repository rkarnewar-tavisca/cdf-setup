import { Injectable } from '@angular/core';
import { Http } from '@orxe-sdk/http';
import { IAppState } from '@store/state/app.state';
import { Store } from '@ngrx/store';
import { UpdateCLPEnabledFlow } from '@store/actions/cart.actions';
import { CHECKOUT_CONST } from '../constants/checkout-constant';
import { AppState } from '@orxe-sdk/app-state';
import Cart from '@orxe-checkout-sdk/cart';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private _http: Http = new Http();
  agentId: string;

  constructor(private _store: Store<IAppState>, private readonly _cart: Cart) {}
  /**
   * This funtionis used to pass the value for the header attribute and update it in the cart
   * @param headerField - header attribute that needs to be updated
   * @param headerValue - value for the header attribute that needs to be updated
   */
  setHeaders(headerField, headerValue) {
    const headers = {};
    headers[headerField] = headerValue;
    this._cart.setHeaders(headers);
  }

  /**
   * @description - This function is use to add key value in array
   * @param array - the list
   * @param key - value key name present in the array
   */
  performAdditionOnArrayByKey(array: any[], key: string) {
    let completeAmount = 0;
    array.forEach((element: any) => {
      completeAmount =
        +completeAmount + (+element[key] < 0 ? -+element[key] : +element[key]);
    });
    return completeAmount;
  }

  /**
   * @description - This function will find & map Products with Add on Produts item
   * @param cartObject - the cart object with product items
   * @param key - key name present in the array
   * @param value - value whom need to compaire
   */
  performProductFilterOnCart(cartObject: any, key: string, value: any) {
    cartObject['addOnProductsList'] = [];
    cartObject['productsList'] = [];
    if (cartObject.items && cartObject.items.length > 0) {
      cartObject['items'].forEach((element: any) => {
        if (element[key].toLowerCase() === value.toLowerCase()) {
          const mainProductType = this.fetchMainProductObjectDetails(
            element,
            cartObject['items']
          );
          element = { ...element, mainProductType };
          cartObject['addOnProductsList'].push(element);
        } else {
          cartObject['productsList'].push(element);
        }
      });
    }
    // Decide app flow according to Cart Detail response
    let isclpFlow = cartObject.isClpEnabled
      ? CHECKOUT_CONST.CLP
      : CHECKOUT_CONST.NON_CLP;
    this._store.dispatch(new UpdateCLPEnabledFlow(isclpFlow));
    return cartObject;
  }

  fetchMainProductObjectDetails(object: any, array: any[]) {
    const mainProductObject = array.find(
      (element) => element.id === object?.dependsOn?.itemRefId
    );
    return mainProductObject ? mainProductObject.productType : null;
  }

  getOverlayData() {
    return this._http.get('assets/mock/cancel-hotel-overlay-test-data.json');
  }

  findObjectInArray(array: any[], key: string, value: any) {
    return array.find((element: any) =>
      key ? element[key] === value : element === value
    );
  }

  /**
   * Fetch settings for micro app
   * currently fetched from static json in assets
   */
  getSettings() {
    return this._http.get<any>(
      'assets/dynamic-components/products-settings.json'
    );
  }

  getProductSettingsForPage(page) {
    return AppState.get('settings')[page];
  }

  getProductSettings(list: any[], key: string, extraArgs?: any) {
    const productsList = JSON.parse(JSON.stringify(list));
    const settingsList = this.getProductSettingsForPage(key);
    if (settingsList) {
      productsList.forEach((element: any) => {
        element['settings'] = this.findObjectInArray(
          settingsList,
          'type',
          element.productType
        );
        if (extraArgs) {
          for (const key in extraArgs) {
            if (Object.prototype.hasOwnProperty.call(extraArgs, key)) {
              element[key] = extraArgs[key];
            }
          }
        }
      });
    }
    return { productsList, settingsList };
  }

  getTravelerFormDataByProduct(productId: string, productType: string) {
    return this._cart.profileOperations.getCartItemParticipants({id: productId, type: productType});
  }
}
