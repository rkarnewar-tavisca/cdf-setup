import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';
import { selectReviewAndPay } from '@store/selectors/review-and-pay.selectors';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { CartDetails } from '../../interface/cart-details';
import { CultureService } from '@orxe-culture/angular';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss'],
})
export class CartTotalComponent implements OnInit {
  @Input() flow: string = PAYMENT_SUMMARY_CONST.NON_CLP;
  @Input() userProfile: any;
  @Input() readOnly = true;
  @Input() screen: string;
  @Input() cartDetail: CartDetails;
  @Input() paymentOption: any;
  @Output() updateCartResponse = new EventEmitter();
  pointBalance: number;
  updatedPaymentLabels = {
    pointsRedeemed: this._cultureService.orxeTranslate(
      'payment-summary.points_to_redeem'
    ),
    amountToCard: this._cultureService.orxeTranslate(
      'payment-summary.balance_due'
    ),
  };
  billingInfo: any;
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;

  reviewAndPayDetails$ = this._store.select(selectReviewAndPay);
  constructor(
    private _store: Store<IAppState>,
    private _cultureService: CultureService
  ) {}

  ngOnInit() {
    if (this.screen === PAYMENT_SUMMARY_CONST.CONFIRM_SCREEN) {
      this.updatedPaymentLabels = {
        pointsRedeemed: this._cultureService.orxeTranslate(
          'payment-summary.points_redeemed'
        ),
        amountToCard: this._cultureService.orxeTranslate(
          'payment-summary.amount_billed'
        ),
      };
    } else {
      this.updatedPaymentLabels = {
        pointsRedeemed: this._cultureService.orxeTranslate(
          'payment-summary.points_to_redeem'
        ),
        amountToCard: this._cultureService.orxeTranslate(
          'payment-summary.balance_due'
        ),
      };
    }
    this.reviewAndPayDetails$.subscribe((response: any) => {
      this.billingInfo = response.billingInfo?.data;
    });
  }

  updateCartRes(event) {
    this.updateCartResponse.emit(event);
  }
}
