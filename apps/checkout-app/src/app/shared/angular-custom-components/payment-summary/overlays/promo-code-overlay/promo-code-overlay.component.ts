import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Overlay } from './../overlays';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentSummaryService } from '../../services/payment-summary.service';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';

@Component({
  selector: 'promo-code-overlay',
  templateUrl: './promo-code-overlay.component.html',
  styleUrls: ['./promo-code-overlay.component.scss'],
})
export class PromoCodeOverlayComponent extends Overlay implements OnInit {
  @Output() promo = new EventEmitter();
  promoCodeForm = this.fb.group(
    {
      promocode: new FormControl(''),
    },
    {
      validators: this.validatePromocode('promocode'),
    }
  );
  errorState: boolean = false;
  disableBtn: boolean = true;
  buttonLoader: boolean = false;
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;
  promoResp = {
    promoCode: '',
    resp: {},
  };
  constructor(
    private fb: FormBuilder,
    private _paymentService: PaymentSummaryService
  ) {
    super();
  }

  ngOnInit(): void {}

  checkPromoCodeResponse(resp, promoCd) {
    if (resp?.code === PAYMENT_SUMMARY_CONST.STATUS_CODE) {
      this.errorState = true;
    } else {
      this.errorState = false;
      this.promoResp = {
        promoCode: promoCd,
        resp: resp,
      };
      this.promo.emit(this.promoResp);
      super.close();
    }
  }
  promoCode(promoCode) {
    this._paymentService.applyPromoCode(promoCode).subscribe((data) => {
      this.checkPromoCodeResponse(data, promoCode);
    });
  }
  validatePromocode(controlName: string): object {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (!control?.value || control?.value?.length === 0) {
        control.setErrors({ inputRequired: true });
        this.disableBtn = true;
      } else {
        this.disableBtn = false;
      }
    };
  }

  public discardPromo(): void {
    this.promoCodeForm.controls['promocode'].setValue('');
    super.close();
  }

  public applyPromo(promoCode): void {
    this.buttonLoader = true;
    this._paymentService.applyPromoCode(promoCode).subscribe(
      (data) => {
        this.buttonLoader = false;
        this.checkPromoCodeResponse(data, promoCode);
      },
      (Error: any) => {
        this.buttonLoader = false;
        this.checkPromoCodeResponse(Error.error, promoCode);
      }
    );
  }

  onBlurValidateInputs() {
    if (
      this.promoCodeForm.get('promocode').touched &&
      this.promoCodeForm.get('promocode').value === ''
    ) {
      this.promoCodeForm.get('promocode').markAsUntouched();
      this.promoCodeForm.reset();
      this.errorState = false;
    }
  }
}
