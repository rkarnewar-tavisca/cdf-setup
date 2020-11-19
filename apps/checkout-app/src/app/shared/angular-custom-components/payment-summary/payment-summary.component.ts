import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from './constants/payment-summary-constant';
import { CartDetails } from './interface/cart-details';
import {CHECKOUT_CONST} from '../../constants/checkout-constant';

import { PaymentSummaryService } from './services/payment-summary.service';
@Component({
  selector: 'orxe-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;
  @Input() cartDetail: CartDetails;
  @Input() flow: string = PAYMENT_SUMMARY_CONST.NON_CLP;
  @Input() userProfile: any;
  @Input() userData: any;
  @Input() screen: string;
  @Input() readOnly: boolean = true;
  @Input() clientPrgramFee: number;
  @Input() paymentOption: any;
  pointBalance: number;
  updatedPayment={
    amount:null,
    points:null
  };
  CHECKOUT_CONST=CHECKOUT_CONST;
  constructor(
    private readonly _viewContainerRef: ViewContainerRef,
    private _paymentSummary: PaymentSummaryService
  ) {}

   @Output() updateCart = new EventEmitter();


  ngOnInit(): void {
    this._paymentSummary.setCartDetails(this.cartDetail);
    this._paymentSummary.setUserDetails(this.userData);
  }

  updateCartResponse(event: any) {
    // get the indicator for update cart
    this.updateCart.emit(event);
  }
}
