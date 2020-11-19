import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectCartDetail } from '@store/selectors/cart.selectors';
import { userState } from '@store/selectors/user.selectors';
import { selectTravelerInfo } from '@store/selectors/traveler-info.selectors';
import { Router } from '@angular/router';
import { GetCartDetail } from '@store/actions/cart.actions';
import {
  UpdateTravelerContactDetail,
  UpdateTravelerDetail,
} from '@store/actions/traveler-info.actions';
import { UpdateUserProfile } from '@store/actions/user.actions';
import { selectClpFlow } from '@store/selectors/cart.selectors';
import { BehaviorSubject } from 'rxjs';
import { TravelerInfoService } from '../../services/traveler-info.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ValidationService } from '@shared/services/validation.service';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';

@Component({
  selector: 'traveler-info-screen',
  templateUrl: './traveler-info-screen.component.html',
  styleUrls: ['./traveler-info-screen.component.scss'],
})
export class TravelerInfoScreenComponent
  implements OnInit, AfterViewInit, OnDestroy {
  CHECKOUT_CONST = CHECKOUT_CONST;
  profileData = new BehaviorSubject<any>([]);
  formSubmitted = new BehaviorSubject<boolean>(false);
  ofacStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public viewModel: any = {
    cartDetails: null,
    user: null,
    userSessionData: null,
    userProfileData: null,
    loading: true,
    contactFormData: null,
    contactFormValid: false,
    productsFormValid: false,
    travelerDetailsForms: [],
    ofacResponse: null,
    buttonLoader: false,
  };
  public subscription = new Subscription();

  cartDetail$ = this._store.pipe(select(selectCartDetail));
  clpFlow$ = this._store.select(selectClpFlow);
  userDetails$ = this._store.pipe(select(userState));
  contactFormDetails$ = this._store.pipe(select(selectTravelerInfo));

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _travelerInfoService: TravelerInfoService,
    private _cdRef: ChangeDetectorRef,
    private _location: Location,
    private _validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartDetail$.subscribe((response: any) => {
        this.viewModel.cartDetails = response;
      })
    );

    this.subscription.add(
      this.userDetails$.subscribe((response) => {
        this.viewModel.userSessionData = response.userSession;
        this.viewModel.userProfileData = response.userProfiles;
        this.viewModel.loading = response.loading;
        this.profileData.next(this.viewModel.userProfileData);
      })
    );

    this.subscription.add(
      this.contactFormDetails$.subscribe((response) => {
        this.updateContactFormData(response);
      })
    );

    if (!this.viewModel.cartDetails?.cartInfo?.cartDetails) {
      this._store.dispatch(new GetCartDetail());
    }
  }

  ngAfterViewInit() {
    this._cdRef.detectChanges();
  }

  /**
   * The function will call on click of Submit or Review and Pay button
   * Used to OFAC check when user click on review & pay button
   *
   * @memberof TravelerInfoScreenComponent
   */
  validateOnClickReviewAndPay(): void {
    this.submitForm();
    const dynamicProductsList = this.getDynamicProductList();
    if (dynamicProductsList?.length) {
      if (
        dynamicProductsList?.length ===
        this.viewModel.travelerDetailsForms?.length
      ) {
        const validForms = this.viewModel.travelerDetailsForms.filter(
          (form) => form.valid === true
        );
        if (validForms.length === dynamicProductsList.length) {
          this.viewModel.productsFormValid = true;
          this.navigateTo();
        } else {
          this.viewModel.productsFormValid = false;
        }
      } else {
        this.viewModel.productsFormValid = false;
      }
    } else {
      this.viewModel.productsFormValid = true;
      this.navigateTo();
    }
  }

  navigateTo() {
    if (this.viewModel.contactFormValid && this.viewModel.productsFormValid) {
      const dynamicProductsList = this.getDynamicProductList();
      if (dynamicProductsList.length > 0 && CHECKOUT_CONST.OFAC_ENABLE) {
        this.checkOFAC();
        this.viewModel.buttonLoader = true;
      } else {
        this._router.navigate(['review-and-pay']);
      }
    }
  }

  /**
   * TO DO : Check OFAC of travelers
   *
   * @memberof TravelerInfoScreenComponent
   */
  checkOFAC() {
    const ofacRequestObject = this._travelerInfoService.getOFACRequestObject(
      this.viewModel.userSessionData,
      this.viewModel.travelerDetailsForms
    );
    this._validationService.checkOFAC(ofacRequestObject).subscribe((data) => {
      this.viewModel.buttonLoader = false;
      this.viewModel.ofacResponse = data;
      if (data.status.toLowerCase() === CHECKOUT_CONST.FAILURE_STATUS) {
        this.ofacStatus.next(true);
      } else {
        this.ofacStatus.next(false);
        this._router.navigate(['review-and-pay']);
      }
    }, (Error: any) => {
      this.viewModel.buttonLoader = false;
    });
  }

  /**
   * Method to handle product information data and save in state
   *
   * @param {*} event
   * @memberof TravelerInfoScreenComponent
   */
  onSubmitProductData(event) {
    this.viewModel.travelerDetailsForms = event;
    this._store.dispatch(new UpdateTravelerDetail(event));
    this.checkProductsFormsValidity(this.viewModel.travelerDetailsForms);
  }

  /**
   * Method to post updated profile information to CartSDK
   *
   * @param {*} event
   * @memberof TravelerInfoScreenComponent
   */
  onSubmitProfileData(event) {
    this._store.dispatch(new UpdateUserProfile(event));
  }

  /**
   * Method to check validity of all gift card form
   *
   * @param {*} formsData
   * @memberof TravelerInfoScreenComponent
   */
  checkProductsFormsValidity(formsData) {
    const dynamicProductsList = this.getDynamicProductList();
    if (dynamicProductsList?.length) {
      if (dynamicProductsList?.length === formsData?.length) {
        const validForms = formsData.filter((form) => form.valid === true);
        if (validForms.length === dynamicProductsList.length) {
          this.viewModel.productsFormValid = true;
        } else {
          this.viewModel.productsFormValid = false;
        }
      } else {
        this.viewModel.productsFormValid = false;
      }
    } else {
      this.viewModel.productsFormValid = true;
    }
  }

  // TO DO : need to change implementation after all other products input forms are dynaically added
  getDynamicProductList() {
    const productList = [
      ...this.viewModel.cartDetails.cartInfo.cartDetails.productsList,
    ];
    const dynamicProductsList = productList.filter(
      (product) =>
        product.productType === 'giftcard' || product.productType === 'Flight'
    );
    return dynamicProductsList;
  }

  /**
   * Used to handle on back button click to navigate back to landing page
   *
   * @memberof TravelerInfoScreenComponent
   */
  onLeftIconClick(): void {
    this._location.back();
  }

  /**
   * event handler for contact form data submission
   * Update contact form data in state
   *
   * @param {*} contactData
   * @memberof TravelerInfoScreenComponent
   */
  contactSubmit(contactData): void {
    if (contactData) {
      this.viewModel.contactFormData = contactData;
      this._store.dispatch(new UpdateTravelerContactDetail(contactData));
    } else {
      // TO DO: Handle error case , Need to revisit implementation
      console.log('error');
    }
  }

  /**
   * Method to check if contact forms is valid or not.
   *
   * @param {*} validateFlags
   * @memberof TravelerInfoScreenComponent
   */
  validateContactForms(validateFlags): void {
    if (validateFlags === true) {
      this.viewModel.contactFormValid = true;
    } else {
      this.viewModel.contactFormValid = false;
    }
  }

  /**
   * method to notify all forms to submit data
   *
   * @memberof TravelerInfoScreenComponent
   */
  submitForm(): void {
    this.formSubmitted.next(true);
  }

  /**
   * Method used to if contact form data is avaliable in state update that in screen object.
   *
   * @param {*} formData
   * @memberof TravelerInfoScreenComponent
   */
  updateContactFormData(formData): void {
    if (formData) {
      this.viewModel.contactFormData = formData.contactFormData;
      this.viewModel.travelerDetailsForms = formData.travelerInfoFormData;
      this.checkProductsFormsValidity(this.viewModel.travelerDetailsForms);
    } else {
      // TO DO : Need to revisit in future in any error handling case
      console.log('No contact form data in current state');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
