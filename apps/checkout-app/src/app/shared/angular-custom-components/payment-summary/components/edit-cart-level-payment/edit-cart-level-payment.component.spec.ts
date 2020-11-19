import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule, CultureService } from '@orxe-culture/angular';
import { EditCartLevelPaymentComponent } from './edit-cart-level-payment.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';

describe('EditCartLevelPaymentComponent', () => {
  let component: EditCartLevelPaymentComponent;
  let fixture: ComponentFixture<EditCartLevelPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCartLevelPaymentComponent ],
      imports: [CultureModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: CultureService,
          useValue: {
            orxeTranslate: jest.fn().mockReturnValue('total'),
          },
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCartLevelPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call toggleRedeemPoints to open expansion panel and update UP icon', () => {
    const event = {
      'target' : {
        'isExpanded': true
      } 
    }
    component.toggleRedeemPoints(event);
    expect(component.icon).toBe(PAYMENT_SUMMARY_CONST.ICON_UP_Arrow);
  });
  it('should call toggleRedeemPoints to close expansion panel and update Down icon', () => {
    const event = {
      'target' : {
        'isExpanded': false
      } 
    }
    component.toggleRedeemPoints(event);
    expect(component.icon).toBe(PAYMENT_SUMMARY_CONST.ICON_DOWN_Arrow);
  });
  it('should call toggleRedeemPoints and check if class for expansion panel exists on HTML', () => {
    component.readOnly = false;
    component.flow = 'CLP';
    fixture.detectChanges();
    const expansioPanel = fixture.debugElement.nativeElement.querySelector('orxe-expansion-panel');
    expect(expansioPanel.getAttribute('hide-toggle-icon')).toBeTruthy();
    const expansioPanelHeading = fixture.debugElement.nativeElement.querySelector('div#want-to-use-less-points');
    expect(expansioPanelHeading.classList.contains('edit-cart-points--accordion-title')).toBeTruthy();
  });
  it('should call updateCartResp method to update cart based on payment option', () => {
    const event = {
      updateCart: true,
      resp: {},
      paymentOption: {
        'redeemed': 'cash',
        'isAccordionOpen': true
      }
    };
    component.updateCartResp(event);
    expect(component).toBeTruthy();
  })
});
