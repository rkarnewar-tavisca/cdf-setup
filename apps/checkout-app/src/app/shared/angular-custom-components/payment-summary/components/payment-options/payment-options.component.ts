import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  AfterViewInit,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PaymentSummaryService } from '../../services/payment-summary.service';
import { CultureService } from '@orxe-culture/angular';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';
import { CHECKOUT_CONST } from '../../../../constants/checkout-constant';

@Component({
  selector: 'orxe-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
})
export class PaymentOptionsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('paymentOption', { static: false }) paymentOption: ElementRef;

  @Input() totalPoints: any;
  @Input() redeemedPoints: any;
  @Input() cartDetails: any;
  @Input() userProfile: any;
  @Input() paymentsOption: any;
  @Output() updateCartResp = new EventEmitter();
  paymentOptionsForm: FormGroup;
  disableBtn: boolean;
  subscription = new Subscription();
  minAllowedPoints: number = 0;
  maxAllowedPoints: number = 0;
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;
  CHECKOUT_CONST = CHECKOUT_CONST;
  payment: string;
  showErrorMsg: boolean;
  errorMsg: any;
  disablePoints: boolean = false;
  disableCash: boolean = false;
  paymentOptionResp = {};
  constructor(
    private _paymentService: PaymentSummaryService,
    private fb: FormBuilder,
    private _cultureService: CultureService
  ) {}
  ngAfterViewInit(): void {
    if (this.paymentsOption?.redeemed) {
      this.paymentOption.nativeElement.value = this.paymentsOption?.redeemed;
    } else if (
      !this.paymentsOption?.redeemed &&
      this.cartDetails?.price?.points
    ) {
      this.paymentOption.nativeElement.value =
        PAYMENT_SUMMARY_CONST.POINTS_LABEL;
    }
  }

  ngOnInit() {
    this.cartDetails?.items?.forEach((item) => {
      this.minAllowedPoints += item?.pointsDistributionLimit?.min;
      this.maxAllowedPoints += item?.pointsDistributionLimit?.max;
    });
    this.paymentOptionsForm = this.fb.group({
      pointsToRedeem: new FormControl(''),
    });
    const pointsControl = this.paymentOptionsForm.get(
      PAYMENT_SUMMARY_CONST.POINT_TO_REDEEM
    );
    pointsControl.setValue(this.cartDetails?.price?.points);
    pointsControl.valueChanges.subscribe((points) => {
      if (points)
        if (points < this.minAllowedPoints) {
          pointsControl.setErrors({ min: true });
        } else if (
          points > this.maxAllowedPoints &&
          points <= this.userProfile?.programCurrency?.value
        ) {
          pointsControl.setErrors({ max: true });
        } else if (points > this.userProfile?.programCurrency?.value) {
          pointsControl.setErrors({ exceedsTotal: true });
        }
      if (points === '' || pointsControl.invalid) {
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
    });
  }

  validate(paymentType, event) {
    event.preventDefault();
    event.stopPropagation();
    if (paymentType === PAYMENT_SUMMARY_CONST.POINTS_LABEL)
      if (
        this.paymentOptionsForm.get(PAYMENT_SUMMARY_CONST.POINT_TO_REDEEM)
          .invalid ||
        this.paymentOptionsForm.get(PAYMENT_SUMMARY_CONST.POINT_TO_REDEEM)
          .value === ''
      ) {
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
    else {
      this.disableBtn = true;
      this.updatePoints(PAYMENT_SUMMARY_CONST.CASH_LABEL);
    }
  }

  onBlurValidateInputs(fieldName: string) {
    const control = this.paymentOptionsForm.get(fieldName);
    control.markAsTouched({ onlySelf: true });
    if (
      fieldName === PAYMENT_SUMMARY_CONST.POINT_TO_REDEEM &&
      control.valid &&
      parseInt(control.value) === 0
    ) {
      this.payment = PAYMENT_SUMMARY_CONST.CASH_LABEL;
    }
  }

  returnValidationMsg() {
    const control = this.paymentOptionsForm.get(
      PAYMENT_SUMMARY_CONST.POINT_TO_REDEEM
    );
    if (control.getError('min')) {
      return (
        this._cultureService.orxeTranslate('payment-summary.points_min_error') +
        `${this.minAllowedPoints} ` +
        this._cultureService.orxeTranslate('payment-summary.points_label')
      );
    } else if (control.getError('exceedsTotal')) {
      return this._cultureService.orxeTranslate(
        'payment-summary.points_available_error'
      );
    } else if (control.getError('max')) {
      return this._cultureService.orxeTranslate(
        'payment-summary.points_max_error'
      );
    }
  }
  updatePoints(redeemed) {
    this.showErrorMsg = false;
    if (redeemed === PAYMENT_SUMMARY_CONST.CASH_LABEL) {
      this.disablePoints = true;
    } else {
      this.disableCash = true;
    }
    const requestObj = {
      currency: this.cartDetails?.currency,
      pointsType: this.CHECKOUT_CONST.POINTS_UNIT,
      paymentOptions: {
        points:
          this.paymentOption.nativeElement.value ==
          PAYMENT_SUMMARY_CONST.POINTS_LABEL
            ? parseInt(
                this.paymentOptionsForm.get(
                  PAYMENT_SUMMARY_CONST.POINT_TO_REDEEM
                ).value
              )
            : this.minAllowedPoints,
      },
    };
    this._paymentService.applyPaymentOptions(requestObj).subscribe(
      (res) => {
        this.disableCash = false;
        this.disablePoints = false;
        this.paymentOptionResp = {
          updateCart: true,
          resp: res,
          paymentOption: {
            redeemed: redeemed,
            isAccordionOpen: true,
          },
        };
        this.updateCartResp.emit(this.paymentOptionResp);
      },
      (err) => {
        this.errorMsg =
          err?.error?.info.length > 0
            ? err?.error?.info[0].message
            : err?.error?.message
            ? err?.error?.message
            : this._cultureService.orxeTranslate(
                'payment-summary.try_changing_points'
              );
        this.showErrorMsg = true;
        this.disableCash = false;
        this.disablePoints = false;
      }
    );
  }

  errorState(fieldName: string): boolean {
    return (
      this.paymentOptionsForm.get(fieldName).touched &&
      this.paymentOptionsForm.get(fieldName).errors != null
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
