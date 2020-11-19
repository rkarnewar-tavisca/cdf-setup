import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@core/store/state/app.state';
import {
  selectCartDetail,
  selectClpFlow,
  selectClientProgramFee,
} from '@core/store/selectors/cart.selectors';
import { orderInit } from '@store/selectors/booking.selectors';
import {
  selectUserSession,
  selectUserProfile,
} from '@core/store/selectors/user.selectors';
import { Router } from '@angular/router';
import { selectTravelerInfo } from '@store/selectors/traveler-info.selectors';
import { BookingInitialize } from '@store/actions/booking.actions';
import { userState } from '@store/selectors/user.selectors';
import {
  selectReviewAndPay,
  selectBinResponse,
} from '@store/selectors/review-and-pay.selectors';
import {
  UpdateBillingInfoDetail,
  UpdateBillingAddressDetail,
  ValidateBin,
} from '@store/actions/review-and-pay.actions';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { GetCartDetail } from '@store/actions/cart.actions';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { BookingStatus } from '@store/selectors/booking.selectors';
import { selectUser } from '@store/selectors/user.selectors';
import { CheckoutService } from '@shared/services/checkout.service';
import { ReviewAndPayService } from '../../services/review-and-pay-screen.service';
import { CultureService } from '@orxe-culture/angular';
import { selectTravelerDetails } from '@store/selectors/traveler-info.selectors';
import mockProfileWithAddress from '../../../../../assets/mock/user-profile-with-address.json';
import { BillingAddressComponent } from '../../components/billing-address/billing-address.component';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

// Booking and Order Selectors
import { GetBookingStatus } from '@store/actions/booking.actions';
import { GetOrder } from '@store/selectors/get-order.selectors';
import { GetCartOrder } from '@store/actions/order.actions';
import { UpdateTravelerContactDetail } from '@store/actions/traveler-info.actions';

@Component({
  selector: 'app-review-and-pay-screen',
  templateUrl: './review-and-pay-screen.component.html',
  styleUrls: ['./review-and-pay-screen.component.scss'],
})
export class ReviewAndPayScreenComponent implements OnInit, OnDestroy {
  CHECKOUT_CONST = CHECKOUT_CONST;
  cartDetail$ = this._store.select(selectCartDetail);
  clpFlow$ = this._store.select(selectClpFlow);
  userSessionDetails$ = this._store.select(selectUserSession);
  travelerInfo$ = this._store.select(selectTravelerInfo);
  userDetails$ = this._store.pipe(select(userState));
  reviewAndPayDetails$ = this._store.select(selectReviewAndPay);
  bookInit$ = this._store.pipe(select(orderInit));
  status$ = this._store.pipe(select(BookingStatus));
  userProfiles$ = this._store.pipe(select(selectUserProfile));
  binResponse$ = this._store.pipe(select(selectBinResponse));

  // Added for handling confirmation page
  order$ = this._store.pipe(select(GetOrder));

  selectClientProgramFee$ = this._store.select(selectClientProgramFee);
  // Product Traveller information - State Management
  selectTravelerDetails$ = this._store.pipe(select(selectTravelerDetails));
  address: any;
  billingInfo: any;
  public viewModel: any = {
    cartDetails: null,
    savedCardData: [],
    billingAddress: [],
    billingInfoValidate: false,
    billingAddressValidate: false,
    formsDetail: null,
    billingInfo: null,
    billingAddr: null,
    customerProfile: null,
    bookingError: null,
    submittedMappedBillingAddress: null,
    newCardFlag: true,
    productTravelerDetails: null,
    bookingStatus: {
      status: null,
      trackingId: null,
    },
    showLoader: false,
    clientProgramFee: 0,
    contactInfoSaveStatus: null,
  };
  initFailCount = 0;
  public subscription = new Subscription();
  // Kept for mocking purpose. remove tempUserId after mocking
  tempUserId: any;
  //
  selectedCardProfile: Subject<any> = new BehaviorSubject(null);

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _location: Location,
    private _checkoutService: CheckoutService,
    private _reviewAndPayService: ReviewAndPayService,
    private _cultureService: CultureService
  ) {}

  ngOnInit(): void {
    this.cartDetail$.subscribe((response: any) => {
      this.viewModel.cartDetails = response;
    });
    // Getting user session data for available points balance
    this.subscription.add(
      this.userSessionDetails$.subscribe((response: any) => {
        this.viewModel.userSessionData = response;
      })
    );
    // TO DO - kept for mocking purpose. remove after mocking
    this.subscription.add(
      this._store.select(selectUser).subscribe((response: any) => {
        this.tempUserId = response.id;
      })
    );
    this.subscription.add(
      this.travelerInfo$.subscribe((response: any) => {
        this.viewModel.contactInfomation = response.contactFormData;
      })
    );
    this.subscription.add(
      this.userDetails$.subscribe((response: any) => {
        response = JSON.parse(JSON.stringify(response));
        this.viewModel.customerProfile = response;
        // TO DO: added saved card in response here, Need to update this once we get some cards from profile
        if (this.viewModel.customerProfile.userProfiles?.length > 0) {
          // this.viewModel.customerProfile.userProfiles.find((profile) => {
          //   if (
          //     profile?.type?.toLowerCase() ===
          //     CHECKOUT_CONST.PRIMARY_PROFILE_TYPE.toLowerCase()
          //   ) {
          //     profile.cards = this.savedCardData;
          //     return true;
          //   }
          // });

          this.viewModel.customerProfile.userProfiles.find((profile) => {
            if (
              profile?.type?.toLowerCase() ===
              CHECKOUT_CONST.PRIMARY_PROFILE_TYPE.toLowerCase()
            ) {
              this.viewModel.savedCardData = profile?.cards?.length
                ? profile.cards
                : mockProfileWithAddress?.profile?.cards;
              return true;
            }
          });
        }

        // TO DO: Update this when address is available in profiles returned by checkout-sdk
        this.createAddressArray(mockProfileWithAddress);
      })
    );
    // this.subscription.add(
    //   this.status$.subscribe((response) => {
    //     if (response?.bookingStatus?.errors) {
    //       this.viewModel.bookingError = response?.bookingStatus?.errors;
    //       this.scrollToErrorMsg('app-billing-info');
    //     }
    //   })
    // );

    this.subscription.add(
      this.reviewAndPayDetails$.subscribe((response: any) => {
        this.viewModel.formsDetail = response;
        // If there is selected billing address data in state
        if (response.billingInfo?.savedCardObject) {
          // Trigger Address profile selection when saved card selected in state
          this.viewModel.newCardFlag = false;
          this.triggerAddressProfileChange(
            response.billingInfo.savedCardObject
          );
        }
        this.viewModel.submittedMappedBillingAddress = this._reviewAndPayService.mapAddressObject(
          this.viewModel.billingAddress,
          response.billingAddress
        );
      })
    );

    this.subscription.add(
      this.binResponse$.subscribe((response: any) => {
        if (response && response.isValidBin) {
          this.initiateBooking();
        } else {
          if (response && !response.isValidBin && !response.request) {
            this.showCardNumberError();
          }
        }
      })
    );

    /**
     * Product Traveller Information - Get State Managed
     */
    this.subscription.add(
      this.selectTravelerDetails$.subscribe((response: any) => {
        if (response) {
          this.viewModel.productTravelerDetails = response;
        }
      })
    );
    if (!this.viewModel.cartDetails?.cartInfo?.cartDetails) {
      this._store.dispatch(new GetCartDetail());
    }
    this.subscription.add(
      this.selectClientProgramFee$.subscribe((response: any) => {
        this.viewModel.clientProgramFee = response;
      })
    );
  }

  createAddressArray(profileInfo) {
    this.viewModel.billingAddress = this._reviewAndPayService.mapProfileAddresses(
      profileInfo
    );
  }

  /**
   *
   * @private Get booking request payload
   * @returns {*}
   * @memberof ReviewAndPayScreenComponent
   */
  private getBookingInitReqObj(): any {
    let iToken = '';
    let idempotencyToken = '';
    const productList = this.viewModel.cartDetails?.cartInfo?.cartDetails?.items.map(
      (item) => {
        iToken += item.id;
        return {
          id: item.id,
          bookingInfo: this.getProductTravelerInfo(item),
        };
      }
    );
    const placeOrderReq = {
      items: productList,
      idempotencyToken: idempotencyToken !== '' ? idempotencyToken : iToken,
      customer: {
        // Kept for mocking purpose. remove tempUserId after mocking
        name: {
          title: this.viewModel.userSessionData?.profile?.basicInfo?.name
            ?.title,
          first: this.viewModel.userSessionData?.profile?.basicInfo?.name
            ?.first,
          middle: this.viewModel.userSessionData?.profile?.basicInfo?.name
            ?.middle,
          last: this.viewModel.userSessionData?.profile?.basicInfo?.name?.last,
        },
        phone: {
          type: 'work',
          number: this.viewModel.contactInfomation?.phone,
        },
        address: {
          // TO DO: Once address is available from profile,
          // update this to use address from this.viewModel.customerProfile?.userProfiles?
          line1: mockProfileWithAddress.profile.addresses[0]?.line1,
          line2: mockProfileWithAddress.profile?.addresses[0]?.line2,
          cityName: mockProfileWithAddress.profile?.addresses[0]?.city.name,
          state: mockProfileWithAddress.profile?.addresses[0]?.state,
          countryCode:
            mockProfileWithAddress.profile?.addresses[0]?.countryCode,
          postalCode: mockProfileWithAddress.profile?.addresses[0]?.postalCode,
        },
        email: this.viewModel.contactInfomation?.email,
      },
      formOfPayment: {
        card: {
          token: this.viewModel.billingInfo?.formData?.value?.token,
          number: this.viewModel.billingInfo?.formData?.value?.number,
          holderName: this.viewModel.billingInfo?.formData?.value
            ?.cardHolderName,
          cvv: this.viewModel.billingInfo?.formData?.value?.cvv,
          issuedBy: this.viewModel.billingInfo?.formData?.value?.issuedBy,
          expiry: {
            month: this.viewModel.billingInfo?.formData?.value?.expirationDate
              ?.month,
            year: this.viewModel.billingInfo?.formData?.value?.expirationDate
              ?.year,
          },
          contactInfo: {
            email: this.viewModel.contactInfomation?.email,
            billingAddress: {
              line1: this.viewModel.billingAddr?.line1,
              line2: this.viewModel.billingAddr?.line2,
              cityName: this.viewModel.billingAddr?.city.name,
              state: this.viewModel.billingAddr?.state,
              countryCode: this.viewModel.billingAddr?.countryCode
                ? this.viewModel.billingAddr?.countryCode
                : '',
              postalCode: this.viewModel.billingAddr?.postalCode
                ? this.viewModel.billingAddr?.postalCode
                : '',
            },
            phone: {
              type: 'work',
              number: this.viewModel.contactInfomation?.phone,
              countryCode: '91',
            },
          },
        },
      },
      agent: {
        // TO DO - Temporary added for checking error scenarios
        id: this._checkoutService.agentId
          ? this._checkoutService.agentId
          : 'agent1', //this.viewModel.userSessionData?.agent?.id
      },
    };

    return { placeOrderReq, idempotencyToken, iToken };
  }

  getProductTravelerInfo(item: any) {
    if (this.viewModel?.productTravelerDetails?.length) {
      const data = this._checkoutService.findObjectInArray(
        this.viewModel?.productTravelerDetails,
        'id',
        item?.id
      );
      if (data && data.bookingInfo) {
        return JSON.parse(data?.bookingInfo);
      }
      return null;
    }
  }

  /**
   * Confirm booking button event handler
   * @memberof ReviewAndPayScreenComponent
   */
  onSubmit() {
    if (this.viewModel.showLoader) {
      return;
    }
    const isToken = this.viewModel.billingInfo?.formData?.value?.token;
    if (isToken) {
      /**
       * Trigger Bin Validation in case if VALIDATE_BIN it is enabled and new card
       */
      if (CHECKOUT_CONST.VALIDATE_BIN && this.viewModel.newCardFlag) {
        this.initiateBinValidation();
      } else {
        /**
         * Proceed without bin validation in below cases :
         * 1. In case when validateBin is disabled
         * 2. When card details are selected from saved cards profiles
         */
        this.initiateBooking();
      }
    } else {
      // Error case if card token is null.
      this.showCardNumberError();
    }
  }

  /**
   * initiate bin validation via dispatching ValidateBin action
   * @private
   * @memberof ReviewAndPayScreenComponent
   */
  private initiateBinValidation(): void {
    this._store.dispatch(
      new ValidateBin({
        request: {
          cardNumber: this.viewModel.billingInfo?.formData?.value
            ?.binIdentificationNumber,
          isAgent: CHECKOUT_CONST.IS_AGENT,
        },
      })
    );
  }

  /**
   * Initiate booking via dispatching bin BookingInitialize action
   * @private
   * @memberof ReviewAndPayScreenComponent
   */
  private initiateBooking(): void {
    const requestObj = this.getBookingInitReqObj();
    this.viewModel.showLoader = true;
    this._store.dispatch(
      new BookingInitialize({
        request: requestObj.placeOrderReq,
      })
    );

    this.subscription.add(
      this.bookInit$.subscribe((response: any) => {
        const trackingId = response?.orderIds?.trackingId;
        if (trackingId) {
          this._reviewAndPayService.updateProfileBFF(
            this.viewModel.submittedMappedBillingAddress,
            this.viewModel.customerProfile.userProfiles
          );
          // Save card Logic
          if (
            !this.viewModel.billingInfo.savedCardObject &&
            this.viewModel.billingAddr?.isSaveForFuture
          ) {
            this._reviewAndPayService.saveCard(
              this.viewModel.billingInfo.formData.value,
              this.viewModel.customerProfile.userProfiles
            );
          }
          // Get Order Status and Order Summary
          this.getBoookingStatus(response);

          // this._router.navigate(['booking-confirmation']);
        }
        if (response?.orderIds?.error) {
          this.viewModel.showLoader = false;
          this.viewModel.bookingError = response?.orderIds?.error;
          this.scrollToErrorMsg('app-billing-info');
          if (response?.orderIds?.status.toString().startsWith('5')) {
            requestObj.idempotencyToken =
              requestObj.iToken + '_' + ++this.initFailCount;
          }
        }
      })
    );
  }

  /**
   * Get Booking and Order status. Validate and redirect if successful booking
   * @param {*} initResponse
   * @memberof ReviewAndPayScreenComponent
   */
  getBoookingStatus(initResponse: any) {
    this.viewModel.bookingStatus.trackingId =
      initResponse?.orderIds?.trackingId;
    this._store.dispatch(
      new GetBookingStatus({
        trackingId: this.viewModel.bookingStatus.trackingId,
      })
    );
    this.subscription.add(
      this.status$.subscribe(
        (response: any) => {
          this.viewModel.bookingStatus.status = response?.bookingStatus?.status?.toLowerCase();
          if (
            response?.bookingStatus?.errors?.length > 1 &&
            response?.bookingStatus?.errors[0]?.code !==
              CHECKOUT_CONST.FRAUD_CHECK_ERROR_CODE
          ) {
            this.viewModel.bookingError = response?.bookingStatus?.errors;
            this.scrollToErrorMsg('app-billing-info');
            this.viewModel.showLoader = false;
          } else if (
            response?.bookingStatus?.status?.toLowerCase() ===
            CHECKOUT_CONST.FAILURE_STATUS
          ) {
            this.viewModel.showLoader = false;
            // TODO check in case of flight failure what is status
            // if same as above then delete this if block
          } else {
            if (
              this.viewModel.bookingStatus?.status &&
              this.viewModel.bookingStatus?.status !==
                CHECKOUT_CONST.IN_PROGRESS_STATUS &&
              this.viewModel.bookingStatus?.status !==
                CHECKOUT_CONST.FAILURE_STATUS
            ) {
              this.updateBillingState();
              this._store.dispatch(
                new GetCartOrder({
                  trackingId: this.viewModel.bookingStatus.trackingId,
                })
              );
              this._router.navigate(['booking-confirmation']);
            }
          }
        },
        (err) => {
          // Handle error Message
          console.log(err);
          this.viewModel.showLoader = false;
        }
      )
    );
  }

  showCardNumberError(): void {
    this.viewModel.bookingError = {
      info: [
        {
          message: this._cultureService.orxeTranslate(
            'review-and-pay-screen.card_number_api_error'
          ),
        },
      ],
    };
    this.scrollToErrorMsg('app-billing-info');
  }

  scrollToErrorMsg(tagName) {
    const el = document.getElementsByTagName(tagName).item(0);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  onClickOfCheckoutHeader(event) {
    if (event === 'leftIcon') {
      this.updateBillingState();
      this._location.back();
    }
  }

  updateBillingState() {
    this._store.dispatch(
      new UpdateBillingInfoDetail({
        data: this.viewModel.billingInfo?.formData?.value,
        savedCardObject: this.viewModel?.billingInfo?.savedCardObject,
      })
    );
    this._store.dispatch(
      new UpdateBillingAddressDetail(this.viewModel.billingAddr)
    );
  }

  // updateBillingCardWithAddressState(): void {
  //   this._store.dispatch(
  //     new UpdateBillingCardWithAddress({
  //       card: this.viewModel.billingInfo.formData.value,
  //       address: this.viewModel.billingAddr,
  //     })
  //   );
  // }

  onSubmitBillingInfo(data: any) {
    if (data.formData) {
      // Mark Confirm Booking button disable when invalidCardNumber in case of new Card
      const invalidCardNumber = data.formData.value?.invalidCardNumber;
      this.viewModel.billingInfo = data;
      this.viewModel.billingInfoValidate =
        data.formData.valid && !invalidCardNumber;
    } else {
      this.viewModel.billingInfoValidate = false;
    }

    if (data.savedCardObject && data.savedCardObject.num) {
      this.viewModel.newCardFlag = false;
    } else {
      this.viewModel.newCardFlag = true;
    }

    // Trigger Address profile selection when saved card selected
    this.triggerAddressProfileChange(data?.savedCardObject);
  }

  triggerAddressProfileChange(savedCardObj): void {
    if (savedCardObj && savedCardObj.id) {
      this.selectedCardProfile.next(savedCardObj);
    } else {
      this.selectedCardProfile.next({
        id: 'NEW',
      });
    }
  }

  onSubmitBillingAddress(event: any) {
    if (event.valid) {
      this.viewModel.billingAddr = event.data;
      this.viewModel.billingAddressValidate = event.valid;
    } else {
      this.viewModel.billingAddressValidate = false;
    }
  }

  // Save Billing address in state in case of edit address
  onSaveBillingAddress(event: any) {
    if (event.valid) {
      this.viewModel.billingAddr = event.data;
      this.viewModel.billingAddressValidate = event.valid;
      this._store.dispatch(
        new UpdateBillingAddressDetail(this.viewModel.billingAddr)
      );
    }
  }

  onClickTermsAndConditions() {
    // TO DO - Implementation of overlay
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onContactInfoSubmitted(event: any) {
    if (event?.valid) {
      this._store.dispatch(new UpdateTravelerContactDetail(event?.data));
      this.viewModel.contactInfoSaveStatus = {
        status: true,
      };
    }
  }
}
