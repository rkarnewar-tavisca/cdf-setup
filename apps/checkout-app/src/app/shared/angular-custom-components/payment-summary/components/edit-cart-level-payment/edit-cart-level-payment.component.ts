import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartDetails } from '../../interface/cart-details';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';
@Component({
  selector: 'app-edit-cart-level-payment',
  templateUrl: './edit-cart-level-payment.component.html',
  styleUrls: ['./edit-cart-level-payment.component.scss']
})
export class EditCartLevelPaymentComponent implements OnInit {
  @Input() totalPoints: any;
  @Input() redeemedPoints: any;
  @Input() cartDetail: CartDetails;
  @Input() userProfile: any;
  @Input() readOnly = true;
  @Input() flow: string = PAYMENT_SUMMARY_CONST.NON_CLP;
  @Input() paymentOption: any;
  @Output() updateCartRes = new EventEmitter();
  public icon: string = PAYMENT_SUMMARY_CONST.ICON_DOWN_Arrow;
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;
  isOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.isOpen = this.paymentOption?.isAccordionOpen;
 }
  toggleRedeemPoints(e) {
    this.icon = e.target['isExpanded'] ? PAYMENT_SUMMARY_CONST.ICON_UP_Arrow : PAYMENT_SUMMARY_CONST.ICON_DOWN_Arrow;
  }
  
  updateCartResp(event: any) {
    // get the indicator for update cart
    this.updateCartRes.emit(event);
  }
}