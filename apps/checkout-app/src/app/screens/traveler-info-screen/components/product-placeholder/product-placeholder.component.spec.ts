/**
 * NOTE : There are some JEST issue occures while running below test cases.
 *        This issue has been already raised to orxe team.
 *        So to avoid error we have commented below code and added dummy fake test case which always shows positive result.
 *        Once issue has been solved we can uncomment this code and remove dummy test case.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlaceholderComponent } from './product-placeholder.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { SharedModule } from '../../../../shared/shared.module';
import { CoreModule } from '@core/core.module';
import { CultureModule } from '@orxe-culture/angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DynamicComponentPropsPipe } from '@shared/pipes/dynamic-component-props.pipe';
import { Observable } from 'rxjs';
import Cart from '@orxe-checkout-sdk/cart';
import { CheckoutService } from '@shared/services/checkout.service';
import { exec } from 'child_process';
import { AppState } from '@orxe-sdk/app-state';

describe('ProductPlaceholderComponent', () => {
  let component: ProductPlaceholderComponent;
  let fixture: ComponentFixture<ProductPlaceholderComponent>;
  const detailList = [
    {
      id: '18463218979309742',
      info: {
        email: null,
        firstName: 'test',
        gender: null,
        lastName: null,
        message: null,
        middleName: null,
        profiles: null,
        suffix: 'None',
      },
      productId: 'No_Change',
      productType: 'Hotel',
      valid: false,
    },
    {
      id: '18463218979309741',
      info: {
        email: null,
        firstName: 'test',
        gender: null,
        lastName: null,
        message: null,
        middleName: null,
        profiles: null,
        suffix: 'None',
      },
      productId: 'No_Change',
      productType: 'giftcard',
      valid: false,
    },
  ];
  beforeAll(() => {
    AppState.init();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPlaceholderComponent, DynamicComponentPropsPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CoreModule, CultureModule, HttpClientModule],
      providers: [
        {
          provide: CheckoutService,
          useValue: {
            getProductSettingsForPage: jest
              .fn()
              .mockReturnValue(new Observable()),
            findObjectInArray: jest.fn(),
            createProfilesArray: jest.fn(),
            getProductSettings: jest
              .fn()
              .mockReturnValue({ productsList: [], settingsList: [] }),
            getTravelerFormDataByProduct: jest.fn()
          },
        },
        {
          provide: Cart,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPlaceholderComponent);
    component = fixture.componentInstance;
    component.productsList = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel',
      },
    ];
    fixture.detectChanges();
  });

  test('should render component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  test('should call method getProductSettings on ngOnChanges', () => {
    const spy = jest.spyOn(component, 'getProductSettings');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  test('should emit event when calling productInfoOnSubmitted method', () => {
    const spy = jest.spyOn(component, 'productInfoOnSubmitted');
    component.viewModel.detailsList = detailList;
    fixture.detectChanges();
    component.productInfoOnSubmitted({ detail: detailList[0] });
    expect(spy).toHaveBeenCalled();
  });

  test('should call ngOnInit and set formSubmitted', () => {
    component.formSubmitted.next(true);
    component.viewModel.productsList = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel',
        loadedElementRef: document.createElement('div'),
      },
    ];
    component.ngOnInit();
    fixture.detectChanges();
    expect(
      JSON.parse(
        component.viewModel.productsList[0].loadedElementRef.getAttribute(
          'formSubmitted'
        )
      )
    ).toEqual({ status: true });
  });

  test('should call populateOfacValidationOnProductCompo on change of ofacFailed observable', () => {
    component.ofacFailed.next(true);
    const spy = jest.spyOn(component, 'populateOfacValidationOnProductCompo');
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  test('should call productLoadedEvent and assign loadedElementRef', () => {
    const event = { detail: { elementRef: 'mock' } };
    const item = {};
    component.productLoadedEvent(event, item);
    fixture.detectChanges();
    expect(item).toEqual({ loadedElementRef: 'mock' });
  });

  test('should call populateOfacValidationOnProductCompo and setattribute', () => {
    component.viewModel.productsList = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel',
        loadedElementRef: document.createElement('div'),
      },
    ];
    component.populateOfacValidationOnProductCompo(true);
    fixture.detectChanges();
    expect(
      component.viewModel.productsList[0].loadedElementRef.getAttribute(
        'ofacCheckStatus'
      )
    ).toEqual('true');
  });

  test('should emit event when calling productInfoOnSubmitted method if detailsList is blank', () => {
    const spy = jest.spyOn(component, 'productInfoOnSubmitted');
    fixture.detectChanges();
    component.productInfoOnSubmitted({ detail: detailList[0] });
    expect(spy).toHaveBeenCalled();
  });
});
