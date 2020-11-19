import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { BookingStatus, orderInit } from '@store/selectors/booking.selectors';
import { selectUserSession } from '@store/selectors/user.selectors';
import {
  selectCartDetail,
  selectClientProgramFee,
} from '@store/selectors/cart.selectors';
import { GetBookingStatus } from '@store/actions/booking.actions';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { selectTravelerInfo } from '@store/selectors/traveler-info.selectors';
import { GetOrder } from '@store/selectors/get-order.selectors';
import { GetCartOrder } from '@store/actions/order.actions';
import { interval, Subscription } from 'rxjs';
import { GetCartDetail } from '@store/actions/cart.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmailService } from '@shared/services/email.service';
import { selectTravelerDetails } from '@store/selectors/traveler-info.selectors';
import { UpdateTravelerContactDetail } from '@store/actions/traveler-info.actions';
@Component({
  selector: 'app-confirmation-screen',
  templateUrl: './confirmation-screen.component.html',
  styleUrls: ['./confirmation-screen.component.scss'],
})
export class ConfirmationScreenComponent implements OnInit, OnDestroy {
  constructor(
    private _store: Store<IAppState>,
    private _location: Location,
    private _email: EmailService
  ) {}
  CHECKOUT_CONST = CHECKOUT_CONST;
  contactData: any;
  orderSummary: any;
  userSessionData: any;
  // TO DO : This will be coming from API, need discussion regarding same
  maxEmailsAllowed = CHECKOUT_CONST.MAX_EMAILS_ALLOWED;
  // public bookingStatus = {
  //   status: null,
  //   cartDetails: null,
  //   trackingId: null,
  // };
  public travelInfo = {
    loading: true,
  };
  subscription = new Subscription();
  status$ = this._store.pipe(select(BookingStatus));
  bookInit$ = this._store.pipe(select(orderInit));
  cart$ = this._store.pipe(select(selectCartDetail));
  travelerInfo$ = this._store.pipe(select(selectTravelerInfo));
  order$ = this._store.pipe(select(GetOrder));
  userSessionDetails$ = this._store.select(selectUserSession);
  selectTravelerDetails$ = this._store.pipe(select(selectTravelerDetails));
  selectClientProgramFee$ = this._store.select(selectClientProgramFee);

  public viewModel: any = {
    productTravelerDetails: null,
    contactInfoSaveStatus: null,
    shareEmailStatus: null,
    clientProgramFee: 0,
  };

  ngOnInit(): void {
    this.getTrackingId();
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
    this.subscription.add(
      this.selectClientProgramFee$.subscribe((response: any) => {
        this.viewModel.clientProgramFee = response;
      })
    );
  }
  getTrackingId() {
    // this.subscription.add(
    //   this.cart$.subscribe((response: any) => {
    //     this.bookingStatus.cartDetails = response;
    //   })
    // );

    // if (!this.bookingStatus?.cartDetails?.cartInfo?.cartDetails) {
    //   this._store.dispatch(new GetCartDetail());
    // }
    this.subscription.add(
      this.order$.subscribe((res) => {
        this.orderSummary = res.order;
      })
    );
  }
  clearSubscription(subscriber) {
    subscriber.unsubscribe();
  }

  onShareEmail(event) {
    const userInfo = {
      type: '',
      trackingId: '951680', //To do:update trackingId when actual process order created
      transitCode: '32e7e3ea-7267-4c44-ab67-6ba4d4525490', //hardcoded because of session updating on every refresh
      to: event.join(';'),
    };
    // this.subscription.add(
    // this.status$.subscribe((response: any) => {
    userInfo.type =
      this.orderSummary.orderStatus == CHECKOUT_CONST.ORDER_CONFIRMED_STATUS ||
      this.orderSummary.orderStatus ==
        CHECKOUT_CONST.ORDER_PARTIAL_CONFIRMED_STATUS
        ? CHECKOUT_CONST.BOOKING_STATUS
        : '';
    this._email.shareItinerary(userInfo).subscribe(
      (response: any) => {
        this.viewModel.shareEmailStatus = {
          status: true,
          message: null,
          errorResponse: null,
        };
        console.log('sent');
      },
      (Error) => {
        console.log(Error);
      }
    );
    //   })
    // );
    // this.userSessionDetails$.subscribe((response: any) => {
    //   userInfo.transitCode = response.transitCode;
    //   console.log(response, 'response');
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onContactInfoSubmitted(event: any) {
    if (event?.valid) {
      // TODO: API call to save contact information save will be handle
      this._store.dispatch(new UpdateTravelerContactDetail(event?.data));
      this.viewModel.contactInfoSaveStatus = {
        status: true,
      };
    }
  }
}
