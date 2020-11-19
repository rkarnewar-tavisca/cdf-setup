import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { CheckoutService } from '@shared/services/checkout.service';

@Component({
  selector: 'app-product-placeholder',
  templateUrl: './product-placeholder.component.html',
  styleUrls: ['./product-placeholder.component.scss'],
})
export class ProductPlaceholderComponent implements OnInit, OnChanges {
  @Input() productsList: any[];
  @Output() onClickRemoveItemEvent = new EventEmitter();

  viewModel: any = {
    settingsList: [],
    productsList: []
  };
  CHECKOUT_CONST = CHECKOUT_CONST;
  constructor(private _checkoutService: CheckoutService) {}

  ngOnInit() {}

  removeItem(itemId: any) {
    this.onClickRemoveItemEvent.emit(itemId);
  }

  ngOnChanges() {
    if (this.productsList?.length) {
      this.getProductSettings();
    } else {
      this.viewModel.productsList = [];
      this.viewModel.settingsList = [];
    }
  }

  getProductSettings() {
    const resObj = this._checkoutService.getProductSettings(
      this.productsList,
      'main-product'
    );
    this.viewModel.productsList = resObj.productsList;
    this.viewModel.settingsList = resObj.settingsList;
  }

  status(event: any) {}

  // Product components Event - On Click of Links
  onClickOfLinksEvent(event: any) {
    switch (event.detail.eventType) {
      case 'removeItem':
        this.removeItem(event.detail.id);
        break;
      default:
        break;
    }
  }
  productLoadedEvent(event: any, item: any) {
    item['loadedElementRef'] = event.detail.elementRef;
  }
}
