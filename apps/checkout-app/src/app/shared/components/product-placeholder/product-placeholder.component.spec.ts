import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlaceholderComponent } from './product-placeholder.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { CultureModule } from '@orxe-culture/angular';
import { Observable } from 'rxjs';
import { CheckoutService } from '@shared/services/checkout.service';
import { DynamicComponentPropsPipe } from '../../pipes/dynamic-component-props.pipe';
import Cart from '@orxe-checkout-sdk/cart';
import { AppState } from '@orxe-sdk/app-state';
describe('ProductPlaceholderComponent', () => {
  let component: ProductPlaceholderComponent;
  let fixture: ComponentFixture<ProductPlaceholderComponent>;
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
          },
        },
        {
          provide: Cart,
        },
      ],
    }).compileComponents();
  }));
  beforeAll(() => {
    AppState.init();
  });
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

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  test('should call method getProductSettings on ngOnChanges', () => {
    const spy = jest.spyOn(component, 'getProductSettings');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  test('should call method removeItem', () => {
    const spy = jest.spyOn(component, 'removeItem');
    component.removeItem(component.productsList[0].id);
    expect(spy).toHaveBeenCalled();
  });

  test('should call onClickOfLinksEvent method', () => {
    const spy = jest.spyOn(component, 'onClickOfLinksEvent');
    component.onClickOfLinksEvent({ detail: { eventType: 'removeItem' } });
    expect(spy).toHaveBeenCalled();
  });

  test('should call productLoadedEvent and assign loadedElementRef', () => {
    const event = { detail: { elementRef: 'mock' } };
    const item = {};
    component.productLoadedEvent(event, item);
    fixture.detectChanges();
    expect(item).toEqual({ loadedElementRef: 'mock' });
  });

  test('should call onClickOfLinksEvent default case', () => {
    const event = { detail: { eventType: null } };
    component.onClickOfLinksEvent(event);
    let spyMethod;
    spyMethod = spyOn(component, 'onClickOfLinksEvent');
    component.onClickOfLinksEvent(event);
    fixture.detectChanges();
    expect(spyMethod).toHaveBeenCalled();
  });
  test('should call method ngOnChange when productsList is empty', () => {
    component.productsList = [];
    fixture.detectChanges();
    const event = {};
    component.ngOnChanges();
    component.status(event);
    expect(component.viewModel.productsList.length).toBe(0);
    
  });
});
