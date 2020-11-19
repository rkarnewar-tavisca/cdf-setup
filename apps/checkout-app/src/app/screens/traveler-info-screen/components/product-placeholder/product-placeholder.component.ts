import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';

import { IAppState } from '@store/state/app.state';
import { CheckoutService } from '@shared/services/checkout.service';
import { userState } from '@store/selectors/user.selectors';
import { selectTravelerDetails } from '@store/selectors/traveler-info.selectors';

@Component({
  selector: 'product-placeholder',
  templateUrl: './product-placeholder.component.html',
  styleUrls: ['./product-placeholder.component.scss'],
})
export class ProductPlaceholderComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() productsList: any[];
  @Input() formSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  @Output() productsFormData: EventEmitter<any> = new EventEmitter<any>();
  @Output() profileData: EventEmitter<any> = new EventEmitter<any>();
  @Input() ofacFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  viewModel: any = {
    settingsList: [],
    productsList: [],
    detailsList: [],
    profilesList: [],
  };

  loadedElementRef = 'loadedElementRef';

  public subscription = new Subscription();

  userDetails$ = this._store.pipe(select(userState));
  travelerInfoFormData$ = this._store.pipe(select(selectTravelerDetails));

  constructor(
    private _store: Store<IAppState>,
    private _checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    // TODO - once traveller info data managed
    this.subscription.add(
      this.formSubmitted.subscribe((formSubmitted) => {
        if (formSubmitted) {
          this.viewModel.productsList.forEach((element: any) => {
            element?.loadedElementRef?.setAttribute(
              'formSubmitted',
              JSON.stringify({ status: true })
            );
          });
        }
      })
    );

    this.subscription.add(
      this.ofacFailed.subscribe((ofacStatus) => {
        if (ofacStatus) {
          this.populateOfacValidationOnProductCompo(ofacStatus);
        }
      })
    );

    this.subscription.add(
      this.userDetails$.subscribe((response) => {
        this.viewModel.productsList.forEach((element: any) => {
          if (element?.loadedElementRef) {
            element.loadedElementRef.setAttribute(
              'profiles',
              JSON.stringify(response.userProfiles)
            );
          }
        });
      })
    );

    this.subscription.add(
      this.travelerInfoFormData$.subscribe((response) => {
        if (response) {
          this.viewModel.productsList.forEach((product) => {
            this.loadAvailableFormData(product);
          });
        }
      })
    );
  }

  ngOnChanges() {
    this.getProductSettings();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProductSettings() {
    const resObj = this._checkoutService.getProductSettings(
      this.productsList,
      'traveller-info'
    );
    this.viewModel.productsList = resObj.productsList;
    this.viewModel.settingsList = resObj.settingsList;
  }

  status(event: any) {}

  // On Product Component properly loaded, on event the function will call and store Product Component element-reference
  // Also load the data for the form if it is available in the sdk
  productLoadedEvent(event: any, item: any) {
    item[this.loadedElementRef] = event.detail.elementRef;

    this.loadAvailableFormData(item);
  }

  // Product Component Traveller Information - Form data event
  // insert data in array or update in array
  // after that send forms data to travler info page
  productInfoOnSubmitted(event: any) {
    if (this.viewModel.detailsList.length === 0) {
      this.viewModel.detailsList.push(event.detail);
    } else {
      const foundIndex = this.viewModel.detailsList.findIndex(
        (productDetail) =>
          productDetail.id === event.detail.id &&
          productDetail.productId === event.detail.productId &&
          productDetail.productType === event.detail.productType
      );
      this.viewModel.detailsList = [...this.viewModel.detailsList];
      if (foundIndex < 0) {
        this.viewModel.detailsList.push(event.detail);
      } else {
        this.viewModel.detailsList.splice(foundIndex, 1);
        this.viewModel.detailsList.push(event.detail);

        if (event.detail.valid) {
          this.profileData.emit(event.detail);
        }
      }
    }

    this.productsFormData.emit(this.viewModel.detailsList);
  }

  populateOfacValidationOnProductCompo(ofacStatus) {
    this.viewModel.productsList.forEach((element: any) => {
      if (element?.loadedElementRef) {
        element.loadedElementRef.setAttribute('ofacCheckStatus', ofacStatus);
      }
    });
  }

  // Load the last valid state of the form by getting it from the sdk
  private loadAvailableFormData(product: any) {
    if (product?.loadedElementRef) {
      const formData = this._checkoutService.getTravelerFormDataByProduct(
        product.id,
        product.productType
      );
      if (formData) {
        product.loadedElementRef.setAttribute('bookingInfo', formData);
      }
    }
  }
}
