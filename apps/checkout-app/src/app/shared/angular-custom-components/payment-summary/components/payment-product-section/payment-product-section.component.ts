import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';
import { CheckoutService } from '@shared/services/checkout.service';
import { AppState } from '@orxe-sdk/app-state';

@Component({
  selector: 'app-payment-product-section',
  templateUrl: './payment-product-section.component.html',
  styleUrls: ['./payment-product-section.component.scss'],
})
export class PaymentProductSectionComponent implements OnInit {
  @Input() productsList: any[];
  @Input() flow: string = PAYMENT_SUMMARY_CONST.NON_CLP;
  @Input() readOnly = true;

  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;

  viewModel: any = {
    settingsList: [],
  };
  constructor(private _checkoutService: CheckoutService) {}

  ngOnInit() {
    if (this.productsList?.length) {
      this.getPaymentSummaryProductSettings();
    }
  }

  getPaymentSummaryProductSettings() {
    this.viewModel.productsList = JSON.parse(JSON.stringify(this.productsList));
    const response = this._checkoutService.getProductSettingsForPage(
      'payment-summary'
    );
    if (response) {
      this.viewModel.settingsList = response;
      this.viewModel.productsList.forEach((element: any) => {
        element['settings'] = this._checkoutService.findObjectInArray(
          this.viewModel.settingsList,
          'type',
          element.productType
        );
      });
    }
  }

  status(event: any) {}

  onLoadingStatusEvent(event: any) {}
}
