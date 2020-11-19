import { Component, OnInit, Input } from '@angular/core';
import { CheckoutService } from '@shared/services/checkout.service';

@Component({
  selector: 'app-product-detail-placeholder',
  templateUrl: './product-detail-placeholder.component.html',
  styleUrls: ['./product-detail-placeholder.component.scss'],
})
export class ProductDetailPlaceholderComponent implements OnInit {
  @Input() productsList: any;
  viewModel: any = {
    settingsList: [],
    productsList: [],
  };

  constructor(private _checkoutService: CheckoutService) {}

  ngOnInit() {
    const resObj = this._checkoutService.getProductSettings(
      this.productsList,
      'review-and-pay'
    );
    this.viewModel.productsList = resObj.productsList;
    this.viewModel.settingsList = resObj.settingsList;
  }

  status(event: any) {}
  productLoadedEvent(event: any, item: any) {}
}
