import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '@shared/services/checkout.service';

@Component({
  selector: 'app-dynamic-confirm-product',
  templateUrl: './dynamic-confirm-product.component.html',
  styleUrls: ['./dynamic-confirm-product.component.scss'],
})
export class DynamicConfirmProductComponent implements OnInit {
  @Input() productsList: any;
  @Input() orderSummaryResponse: any;
  viewModel: any = {
    settingsList: [],
    productsList: [],
  };

  constructor(private _checkoutService: CheckoutService) {}

  ngOnInit() {
    if (this.productsList?.length) {
      const resObj = this._checkoutService.getProductSettings(
        this.productsList,
        'confirmation',
        { isConfirmationScreen: true }
      );
      this.viewModel.productsList = resObj.productsList;
      this.viewModel.settingsList = resObj.settingsList;
    }
  }

  ngOnChanges() {
    if (this.orderSummaryResponse?.items) {
      this.bookingProcessed();
    }
  }

  status(event: any) {}

  // Product components Event - On Click of Links
  onClickOfLinksEvent(event: any) {
    switch (event.detail.eventType) {
      case 'cancelItem':
        break;
      default:
        break;
    }
  }

  productLoadedEvent(event: any, item: any) {
    item['loadedElementRef'] = event.detail.elementRef;
  }

  bookingProcessed() {
    this.orderSummaryResponse.items.forEach((item: any) => {
      this.viewModel.productsList.forEach((element: any) => {
        if (
          item?.productId === element?.productId &&
          item?.productType === element?.productType &&
          element?.loadedElementRef
        ) {
          element.loadedElementRef.setAttribute('bookingStatus', item?.status);
          element.loadedElementRef.setAttribute(
            'vouchersList',
            JSON.stringify(item?.vouchers)
          );
        }
      });
    });
  }
}
