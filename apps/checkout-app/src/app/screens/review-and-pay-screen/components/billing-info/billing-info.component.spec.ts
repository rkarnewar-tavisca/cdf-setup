import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';

import { BillingInfoComponent } from './billing-info.component';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CultureModule, CultureService } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';
import { FrameLoaderComponent } from '../frame-loader/frame-loader.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LoggingService } from '@shared/services/logging.service';

const savedCardData = [
  {
    id: 'sddwe-123',
    num: '**** **** **** 1111',
    token: 'fgfg8-kk89n-5656ki-57hyt',
    nameOnCard: 'John Doe',
    issuedBy: 'VI',
    expiry: {
      month: 12,
      year: 2020,
    },
  },
  {
    id: 'sddwe-124',
    num: '**** **** **** 1111',
    token: 'fgfg8-kk89n-5656ki-58hyt',
    nameOnCard: 'Johny',
    issuedBy: 'CA',
    expiry: {
      month: 12,
      year: 2019,
    },
  },
];

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let dateSelector: ElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillingInfoComponent, FrameLoaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CoreModule,
        RouterTestingModule.withRoutes([]),
        CultureModule,
        ReactiveFormsModule,
        OrxeFormsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCart: jest.fn().mockReturnValue('test'),
          },
        },
        {
          provide: CultureService,
          useValue: {
            orxeTranslate: jest.fn().mockReturnValue('New'),
          },
        },
        {
          provide: Cart,
        },
        {
          provide: LoggingService,
          useValue: {
            traceLog: jest.fn(),
          },
        },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [FrameLoaderComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    // set default option in saved card payment option dropdown.
    component.billingInfoForm.controls.savedCard.setValue(
      CHECKOUT_CONST.DROPDOWN_OPTION_NEW
    );
    fixture.detectChanges();
    dateSelector = component.dateSelector;
    component.savedCardData = savedCardData;
    component.dateSelector.nativeElement.validate = jest
      .fn()
      .mockImplementationOnce(() => {
        return true;
      });
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should create dateSelector', () => {
    expect(dateSelector).toBeTruthy();
  });

  test('should create dateSelector element', () => {
    const dateSelector = fixture.debugElement.nativeElement.querySelector(
      'orxe-date-selector'
    );
    expect(dateSelector).toBeTruthy();
  });

  test('should call errorState method and return error', () => {
    let data = component.errorState('cardHolderName');
    fixture.detectChanges();
    expect(data).toEqual(false);
  });

  test('should call onBlurValidateInputs method', () => {
    let data = component.onBlurValidateInputs('cardHolderName');
    fixture.detectChanges();
    expect(component.onBlurValidateInputs).toBeTruthy();
  });

  test('should call select card from profile dropdown with new value', () => {
    component.billingInfoForm.controls.savedCard.setValue(
      CHECKOUT_CONST.DROPDOWN_OPTION_NEW
    );
    fixture.detectChanges();
    expect(component.billingInfoForm.controls.cardHolderName.value).toBeNull();
  });

  test('should call select card from profile dropdown with some value', () => {
    component.readonlyCCComponent = true;
    fixture.detectChanges();
    component.savedCardData = savedCardData;
    component.onCardChange({ detail: 'sddwe-123' });
    fixture.detectChanges();
    expect(component.billingInfoForm.controls.cardHolderName.value).toBe(
      'John Doe'
    );
  });

  test('should call select card from profile dropdown with expired date', () => {
    component.readonlyCCComponent = true;
    component.savedCardData = savedCardData;
    component.onCardChange({ detail: 'sddwe-124' });
    fixture.detectChanges();
    expect(component.isInvalidExpirationDate).toBe(true);
  });

  test('should call updateSubmittedData', () => {
    const data = {
      data: savedCardData[0],
    };
    component.updateSubmittedData(data);
    fixture.detectChanges();
    expect(
      component.billingInfoForm.controls.cardHolderName.value
    ).toBeUndefined();
  });

  test('should call createSelectCardDropdownList & cardData options get initialize', () => {
    component.createSelectCardDropdownList();
    fixture.detectChanges();
    expect(component.cardData).toBeDefined();
  });

  test('should render readonly card number component when savedCard is selected', () => {
    component.readonlyCCComponent = true;
    component.savedCardData = savedCardData;
    component.billingInfoForm.controls.savedCard.setValue(savedCardData[0].id);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector(
      '#cardNumberInput'
    );
    expect(element).toBeTruthy();
  });

  test('should call clearCardNumber method when new value is selected from saved card dropdown', () => {
    const clearMethod = jest.spyOn(component, 'clearCardNumber');
    component.onCardChange({ detail: CHECKOUT_CONST.DROPDOWN_OPTION_NEW });
    fixture.detectChanges();
    expect(clearMethod).toHaveBeenCalled();
  });

  test('should clear errors for card number after calling clearCardNumberError method', inject(
    [CultureService],
    (service: CultureService) => {
      (service.orxeTranslate = jest.fn().mockReturnValue('Test error message')),
        (component.errors = {
          info: [{ message: 'Test error message' }],
        });
      component.clearCardNumberError();
      fixture.detectChanges();
      expect(component.errors.info).toBeNull();
    }
  ));

  test('should validate cvv length when issuer is passed', () => {
    const issuers = ['mastercard', 'americanexpress'];
    const updateCVVLengthSpy = jest.spyOn(component, 'updateCVVLength');
    component.validateCVVLength(issuers[0]);
    fixture.detectChanges();
    expect(updateCVVLengthSpy).toHaveBeenCalled();
    // cvv length for mastercard is 3
    expect(component.cvvValidation.maxLength).toEqual(3);
    component.validateCVVLength(issuers[1]);
    fixture.detectChanges();
    // cvv length for americanexpress is 4
    expect(component.cvvValidation.maxLength).toEqual(4);
  });
});
