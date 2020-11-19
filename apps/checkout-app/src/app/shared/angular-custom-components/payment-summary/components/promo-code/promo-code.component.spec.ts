import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PromoCodeComponent } from './promo-code.component';
import Cart from '@orxe-checkout-sdk/cart';
import { PaymentSummaryService } from '../../services/payment-summary.service';
import { PromoCodeOverlayComponent } from '../../overlays/promo-code-overlay/promo-code-overlay.component';
import { OverlayService } from '../../services/overlay.service';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
describe('PromoCodeComponent', () => {
  let component: PromoCodeComponent;
  let fixture: ComponentFixture<PromoCodeComponent>;
  let service: PaymentSummaryService;
  let overlayService: OverlayService;
  let viewContainerRef: ViewContainerRef;
  const promoOverlay = {
    promo: null
  };
  const itemLeveResponse = {
    items: [
      {
        sellingPrice: {
          breakup: {
            offers: [
              {
                id: '22s6t-d4sb-2asf-a165-q2w123sa',
                amount: 100,
                code: 'LuckyTop10'
              }
            ]
          }
        }
      }
    ]
  };
  const cartLevelResponse = {
    price: {
      breakup: {
        offers: [
          {
            id: '22s6t-d4sb-2asf-a165-q2w123sa',
            amount: 100,
            code: 'LuckyTop10'
          }
        ]
      }
    }
  };
  const cartResponse = {
    id: "123"
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CultureModule,
        OrxeFormsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: Cart
        },
        {
          provide: PaymentSummaryService,
          useValue: {
            getCartDetails: jest.fn().mockReturnValue(itemLeveResponse),
            removePromoCode: jest.fn().mockImplementation(cd => {
              return of(cartLevelResponse)
            })
          }
        },
        {
          provide: OverlayService,
          useValue: {
            showOverlay: jest
              .fn()
              .mockReturnValue(new Observable(promoOverlay.promo))
          }
        }
      ]
    }).compileComponents();
    service = TestBed.inject(PaymentSummaryService);
    overlayService = TestBed.inject(OverlayService);
    const fixture = TestBed.createComponent(PromoCodeComponent);
    viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should call openOverlay method', () => {
    spyOn(component, 'openOverlay');
    component.onClickOnLinks('add-a-promo-code');
    fixture.detectChanges();
    expect(component.openOverlay).toHaveBeenCalled();
  });
  test('should call onClickOnLinks method', () => {
    const Spy = spyOn(component, 'overlayData');
    component.openOverlay('add-a-promo-code');
    expect(component.overlayData).toHaveBeenCalled();
  });
  test('should call overlayData method', () => {
    const Spy = spyOn(component, 'checkPromoCodeResp');
    component.overlayData({ promo: new BehaviorSubject('lucky10') });
    expect(Spy).toHaveBeenCalled();
  });
  test('should check success promo code', () => {
    const promoCodeResp = {
      resp: {
        id: '0f8fad5b-d9cb-461f-a165-70867728951z'
      }
    };
    component.checkPromoCodeResp(promoCodeResp);
    expect(component.promoCodeResp.promoStatus).toEqual('offer');
  });
  test('should check internal error ', () => {
    const promoCodeResp = {};
    component.checkPromoCodeResp(promoCodeResp);
    expect(component.promoCodeResp.promoStatus).toEqual(null);
  });
  test('should check promo code is applied ', () => {
    expect(component.appliedPromo.length).toEqual(1);
  });
  test('should call remove promo code', async () => {
    component.onClickRemovePromo('cart');
    expect(component.promoCodeResp.promoCode).toBe('cart');
    expect(component.promoCodeResp.resp).toBe(cartLevelResponse);
  })
  test('should get orxe-button and return its associated attributes', ()=> {
    component.readOnly = false;
    component.promoCodeResp = {
      'promoStatus': null,
      'promoCode': 'code',
      'resp': {},
      'updateCart': true
    };
    fixture.detectChanges();
    const applyPromoBtn = fixture.debugElement.nativeElement.querySelector('orxe-button#apply-promo-code-btn');
    applyPromoBtn.click();
    expect(applyPromoBtn.getAttribute('orxe-id')).toBe('promo-code--add-promo-btn');
  });
  test('should get orxe-button and return its associated attributes', ()=> {
    component.promoCode = {
      'code': 'cart_20_30'
    }
    component.readOnly = false;
    fixture.detectChanges();
    const removePromoBtn = fixture.debugElement.nativeElement.querySelector('orxe-button#remove-promo-code-link');
    removePromoBtn.click();
    expect(removePromoBtn.getAttribute('orxe-id')).toBe('promo-code--success-msg-remove-btn');

  });
});
