import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailPlaceholderComponent } from './product-detail-placeholder.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';
import { DynamicComponentPropsPipe } from '@shared/pipes/dynamic-component-props.pipe';
import { CheckoutService } from '@shared/services/checkout.service';
import { Observable } from 'rxjs';
import { AppState } from '@orxe-sdk/app-state';

describe('ProductDetailPlaceholderComponent', () => {
  let component: ProductDetailPlaceholderComponent;
  let fixture: ComponentFixture<ProductDetailPlaceholderComponent>;
  beforeAll(() => {
    AppState.init();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductDetailPlaceholderComponent,
        DynamicComponentPropsPipe,
      ],
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
          },
        },
        {
          provide: CartService,
        },
        {
          provide: Cart,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailPlaceholderComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
