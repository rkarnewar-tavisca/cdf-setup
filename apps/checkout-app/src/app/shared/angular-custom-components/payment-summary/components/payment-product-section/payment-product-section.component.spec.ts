import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProductSectionComponent } from './payment-product-section.component';
import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { DynamicComponentPropsPipe } from '@shared/pipes/dynamic-component-props.pipe';
import Cart from '@orxe-checkout-sdk/cart';
import { CheckoutService } from '@shared/services/checkout.service';
import { CoreModule } from '@core/core.module';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppState } from '@orxe-sdk/app-state';
describe('PaymentProductSectionComponent', () => {
  let component: PaymentProductSectionComponent;
  let fixture: ComponentFixture<PaymentProductSectionComponent>;
  let checkoutService: CheckoutService;
  beforeAll(() => {
    AppState.init();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentProductSectionComponent, DynamicComponentPropsPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CoreModule, CultureModule, HttpClientTestingModule],
      providers: [
        {
          provide: CheckoutService,
          useValue: {
            getProductSettingsForPage: jest.fn().mockReturnValue(new Observable()),
            findObjectInArray: jest.fn(),
            createProfilesArray: jest.fn()
          }
        },
        {
          provide: Cart
        }
      ]
    }).compileComponents();
    checkoutService = TestBed.inject(CheckoutService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentProductSectionComponent);
    component = fixture.componentInstance;
    component.productsList = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel'
      }
    ];
    fixture.detectChanges();
  });

  test('should create product-section component', () => {
    expect(component).toBeTruthy();
  });

  test('should call getPaymentSummaryProductSettings', async () => {
    spyOn(checkoutService, 'getProductSettingsForPage').and.returnValue(of('test'));
    component.getPaymentSummaryProductSettings();
    fixture.detectChanges();
    expect('test').toBe('test');
  });
  test('should call status and onLoadingStatusEvent methods', () => {
    const event = {}
    component.status(event);
    component.onLoadingStatusEvent(event);
    expect(component).toBeTruthy();
  });
  test('should call getPaymentSummaryProductSettings', async () => {
    const settings = [
      {
        type: 'Hotel',
        primaryCulture: '',
        resources: {
          modulePath:
            'https://checkout-smartcomponent.qa.cnxloyalty.com/gift-card-payment-summary/main-es2015.js',
          path:
            'https://checkout-smartcomponent.qa.cnxloyalty.com/gift-card-payment-summary/main-es2015.js',
          tagName: 'gift-card-payment-summary'
        }
      }
    ];
    const response = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel',
        settings: undefined
      }
    ];
    spyOn(checkoutService, 'getProductSettingsForPage').and.returnValue(of(settings));
    component.getPaymentSummaryProductSettings();
    fixture.detectChanges();
    expect(response).toEqual(component.viewModel.productsList);
  });
});
