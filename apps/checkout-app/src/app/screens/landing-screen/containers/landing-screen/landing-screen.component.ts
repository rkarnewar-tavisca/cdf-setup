import {
  Component,
  OnInit,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { OverlayService } from '@shared/services/overlay.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectCartDetail, selectClientProgramFee, selectPaymentOption } from '@store/selectors/cart.selectors';
import { selectUserSession, selectUser } from '@store/selectors/user.selectors';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { selectClpFlow } from '@store/selectors/cart.selectors';
import { CartService } from '@shared/services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  UpdateCartDetail,
  GetPriceCartDetail,
  UpdatePaymentOption
} from '@store/actions/cart.actions';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.scss'],
})
export class LandingScreenComponent implements OnInit, OnDestroy {
  CHECKOUT_CONST = CHECKOUT_CONST;
  public viewModel: any = {
    cartDetails: null,
    userSession: null,
    clientProgramFee: 0,
    paymentOption: {}
  };

  cartDetail$ = this._store.select(selectCartDetail);
  clpFlow$ = this._store.select(selectClpFlow);
  userSessionDetails$ = this._store.select(selectUserSession);
  selectUser$ = this._store.select(selectUser);
  selectClientProgramFee$ = this._store.select(selectClientProgramFee);
  selectPaymentOption$ = this._store.select(selectPaymentOption);
  public subscription = new Subscription();

  constructor(
    private _store: Store<IAppState>,
    private readonly _overlayService: OverlayService,
    private readonly _viewContainerRef: ViewContainerRef,
    private _cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**
     * Subscribe to cartDetail selector to get cartDetails from store.
     */
    this.subscription.add(
      this.cartDetail$.subscribe((response: any) => {
        this.viewModel.cartDetails = response;
        if (!response.cartInfo) {
          this._store.dispatch(
            new GetPriceCartDetail()
          );
        }
      })
    );

    this.subscription.add(
      this.selectClientProgramFee$.subscribe((response: any) => {
        this.viewModel.clientProgramFee = response;
      })
    );
    this.subscription.add(
      this.selectPaymentOption$.subscribe((response: any) => {
          this.viewModel.paymentOption = response;
      })
    )
  }

  navigateTo() {
    const paymentOpt = {
      'redeemed': this.viewModel?.paymentOption?.redeemed,
      'isAccordionOpen': false
    }
    this._store.dispatch(new UpdatePaymentOption(paymentOpt));    
    this.router.navigate(['traveler-info']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateCart(event: any) {
    // call action to update cart
    if (event.updateCart && event.resp) {
      this._store.dispatch(new UpdateCartDetail(event.resp));
    }
    if (event.paymentOption) {
      this._store.dispatch(new UpdatePaymentOption(event.paymentOption));
    }
  }
  //  Note : - The below method will change/remove once we integrate real time product.
  //  Also the call to remove product will be drived from a custom event from produt only.

  onClickRemoveItemEvent(event) {
    const reqObj = {
      itemId: event,
      currency: this.viewModel.cartDetails?.cartInfo?.cartDetails?.currency
    };
    this._cartService.removeItemFromCart(reqObj).subscribe((data: any) => {
      if (data && data.id) {
        const updateCartObj = {
          updateCart: true,
          resp: data,
        };
        this.updateCart(updateCartObj);
      }
    });
  }
}
