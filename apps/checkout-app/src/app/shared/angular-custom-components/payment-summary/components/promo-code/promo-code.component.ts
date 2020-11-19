import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';
import { CultureService } from '@orxe-culture/angular';
import { OverlayService } from '../../services/overlay.service';
import { PromoCodeOverlayComponent } from '../../overlays/promo-code-overlay/promo-code-overlay.component';
import { PaymentSummaryService } from '../../services/payment-summary.service';
@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss'],
})
export class PromoCodeComponent implements OnInit {
  @Input() readOnly = true;
  @Output() updateCartResponse = new EventEmitter();
  promoCode: any;
  cart: any;
  appliedPromo = [];
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;
  promoCodeResp = {
    promoStatus: null,
    promoCode: null,
    resp: {},
    updateCart: false,
  };
  promoAlert = false;
  promoAlertText: string = null;
  constructor(
    private _overlayService: OverlayService,
    private readonly _viewContainerRef: ViewContainerRef,
    private _paymentSummary: PaymentSummaryService,
    private _cultureService: CultureService
  ) {}
  ngOnInit() {
    this.cart = this._paymentSummary.getCartDetails();
    this.cart?.items?.forEach((item) => {
      if (item?.sellingPrice?.breakup?.offers) {
        if (item?.sellingPrice?.breakup?.offers?.length > 0) {
          this.appliedPromo.push(item?.sellingPrice?.breakup?.offers[0]);
        }
      }
    });
    if (
      this.appliedPromo?.length < 1 &&
      this.cart?.price?.breakup?.offers?.length > 0
    ) {
      this.appliedPromo.push(this.cart?.price?.breakup?.offers[0]);
    }
    if (this.appliedPromo?.length > 0) {
      this.promoCodeResp.promoStatus = PAYMENT_SUMMARY_CONST.OFFER;
      this.promoCode = this.appliedPromo[0];
    } else {
      this.promoCodeResp.promoStatus = null;
    }
  }

  onClickOnLinks(linkId: string) {
    this.openOverlay(linkId);
  }
  openOverlay(overlayName: string) {
    switch (overlayName) {
      case 'add-a-promo-code':
        const promoOverlay: any = this._overlayService.showOverlay(
          PromoCodeOverlayComponent,
          this._viewContainerRef
        );
        this.overlayData(promoOverlay);
        break;
      default:
        break;
    }
  }
  overlayData(promoOverlay) {
    promoOverlay.promo.subscribe((data) => {
      this.checkPromoCodeResp(data);
    });
  }
  checkPromoCodeResp(offerResponse) {
    this.promoAlert = false;
    this.promoAlertText = null;
    if (offerResponse && offerResponse.resp && offerResponse.resp.id) {
      // call update cart on landing page and get refreshed data
      this.promoCodeResp = {
        promoStatus: PAYMENT_SUMMARY_CONST.OFFER,
        updateCart: true,
        resp: offerResponse.resp,
        promoCode: offerResponse.promoCode,
      };
    } else {
      this.promoCodeResp = {
        promoStatus: null,
        updateCart: false,
        resp: {},
        promoCode: null,
      };
      this.promoAlert = true;
      this.promoAlertText = this._cultureService.orxeTranslate(
        'promo-code.failed-to-apply'
      );
    }
    this.updateCartResponse.emit(this.promoCodeResp);
  }

  onClickRemovePromo(promo): void {
    this._paymentSummary.removePromoCode(promo).subscribe(
      (data: any) => {
        this.promoAlert = false;
        this.promoAlertText = null;
        this.updateCart(data, promo);
      },
      (Error: any) => {
        // show feedback indicator as an alert
        this.promoAlert = true;
        this.promoAlertText = this._cultureService.orxeTranslate(
          'promo-code.failed-to-remove'
        );
      }
    );
  }
  updateCart(data, promo) {
    this.promoCodeResp = {
      promoStatus: null,
      updateCart: true,
      resp: data,
      promoCode: promo,
    };
    this.updateCartResponse.emit(this.promoCodeResp);
  }
}
