/**
 * @description : On Product Checkout this component get rendered. This component get rendered when there is no items in cart. User can navigate to the other products using this page.
 */
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, HttpHeaders } from '@orxe-sdk/http';
import { environment } from '@env/environment';
import { AppState } from '@orxe-sdk/app-state';
import Cart from '@orxe-checkout-sdk/cart';
import { UserSessionService } from '@core/services';
@Component({
  selector: 'empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyCartComponent {
  private _http: Http = new Http();
  productList = [
    { name: 'Flights', icon: 'ic-flight' },
    { name: 'Hotels', icon: 'ic-hotel' },
    { name: 'Cars', icon: 'ic-car' },
    { name: 'Activities', icon: 'ic-activity' },
  ];
  public activeTab: string;

  public viewModel: any = {
    appFlow: [
      {
        optionGroup: [
          {value: '',  label: 'Select App Flow'},
          { value: 'non-clp', label: 'Non-CLP flow' },
          { value: 'clp', label: 'CLP flow' },
        ],
      },
    ],
    rewardIdOptions: [
      {
        optionGroup: [
          {value: '',  label: 'Select Payment Option'},
          { value: '1234|5|has_max', label: 'CLP - has_max' },
          { value: '1234|5|has_no_min_max', label: 'CLP - has_no_min_max' },
          { value: '1234|5|has_min_max', label: 'CLP - has_min_max' },
          { value: '1234|5|has_min', label: 'CLP - has_min' },
          { value: '1234|5|purchase_reward', label: 'purchase_reward' },
          { value: '1234|5', label: 'Non-CLP - flow'},
        ],
      },
    ],
    crossSaleProductList: [
      {
        optionGroup: [
          {value: '',  label: 'Select Product Type'},
          { value: 'Hotel', label: 'Hotel' },
          { value: 'giftcard', label: 'Giftcard' },
          { value: 'Car', label: 'Car' },
          { value: 'Activity', label: 'Activity' },
          { value: 'Flight', label: 'Flight' },
        ],
      },
    ],
    cultureList: [
      {
        optionGroup: [
          { value: 'en-US', label: 'English' },
          { value: 'en-PT', label: 'Portuguese' },
          { value: 'en-ES', label: 'Spanish' },
        ],
      },
    ],
    userId: null,
    cartResponse: null,
    productResponse: [],
    cartInProgress: false,
  };
  userControl: FormGroup = this.fb.group({
    selectedflowType: [''],
    selectedProductType: [''],
    selectedPaymentOption: [''],
    selectedCulture: ['en-US'],
    points: [5000],
    amount: [100],
  });
  tenantId: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private readonly _cart: Cart,
    private sessionService: UserSessionService
  ) {}

  /**
   * Click event handler for product div button, Here we can navigate to product page
   */
  onClickProduct(product) {
    this.activeTab = product.name;
  }

  ngOnInit() {
    this.viewModel.userId = Date.now();
    this.tenantId = this._route.snapshot.queryParamMap.get('tenantId');
  }
  updateSession() {
    const clpFlow =
      this.userControl.value.selectedflowType === 'clp'
        ? 'clpmax_' +
          ('test' + Math.floor(Math.random()*90000) + 10000) +
          '_flight|hotel|car|giftcard'
        : 'test_' + Math.floor(Math.random()*90000) + 10000;
    this.viewModel.addToCartBtn = true;
    this.sessionService.createCheckoutSession(clpFlow).subscribe((res) => {
        this.sessionService.setAppState(res.token);
        this.viewModel.addToCartBtn = false;
        this.cdr.detectChanges();
    })
  }
  /** ATTENTION - FOR NOW
   * Added usercontrol to create cart from UI
   */
  addToCart() {
    const payload = {
      currency: 'USD',
      programId: '1371',
      pointsType: 'points',
      item: {
        productId: 'No_Change',
        productType: this.userControl.value.selectedProductType,
        quotedPrice: {
          amount: this.tenantId? 100 : 12,
          amountWithoutTax: this.tenantId ? 100 : 11,
        },
        paymentOptions: [
          {
            rewardId: this.userControl.value.selectedPaymentOption,
            amount: this.userControl.value.amount
              ? this.userControl.value.amount
              : 0,
            points: this.userControl.value.points
              ? this.userControl.value.points
              : 0,
            fee: null,
          },
        ],
      },
    };
    this.viewModel.addToCartBtn = true;
    this.viewModel.cartInProgress = true;
    this.sessionService.addItemToCart(payload).subscribe(
      (response: any) => {
        if (response) {
          this.viewModel.cartResponse = response;
          this.viewModel.productResponse = response.items;
          this.viewModel.cartInProgress = false;
          this.viewModel.addToCartBtn = false;
          this.cdr.detectChanges();
        } else {
          this.viewModel.cartInProgress = false;
          this.viewModel.addToCartBtn = false;
        }
      },
      (err) => {
        this.viewModel.cartInProgress = false;
        this.viewModel.addToCartBtn = false;
      }
    );
  }

  viewCart() {
    let sessionid = AppState.get('sessionId');
    const queryParam = {
      sid: sessionid,
      culture: this.userControl.value.selectedCulture
    };
    if (this.tenantId) {
      queryParam['tenantId'] = this.tenantId;
    }
    this.router.navigate(['/trip-cart'], {
      queryParams: queryParam
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
