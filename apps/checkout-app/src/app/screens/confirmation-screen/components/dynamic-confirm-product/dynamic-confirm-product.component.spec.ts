import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicConfirmProductComponent } from './dynamic-confirm-product.component';
import { CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';
import { DynamicComponentPropsPipe } from '@shared/pipes/dynamic-component-props.pipe';
import { CheckoutService } from '@shared/services/checkout.service';
import { Observable } from 'rxjs';
import { AppState } from '@orxe-sdk/app-state';

describe('DynamicConfirmProductComponent', () => {
  let component: DynamicConfirmProductComponent;
  let fixture: ComponentFixture<DynamicConfirmProductComponent>;
  beforeAll(() => {
    AppState.init();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicConfirmProductComponent, DynamicComponentPropsPipe],
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
    fixture = TestBed.createComponent(DynamicConfirmProductComponent);
    component = fixture.componentInstance;
    component.productsList = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel',
        loadedElementRef: component,
      },
    ];
    component.orderSummaryResponse = {
      items: [
        {
          id: 'PROD12345',
          productId: 'fad5b-d9cb-461f-a165-7086772895',
          productType: 'Hotel',
          status: true,
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClickOfLinksEvent', () => {
    const event = { detail: { eventType: 'cancelItem' } };
    component.onClickOfLinksEvent(event);
    let spyMethod;
    spyMethod = spyOn(component, 'onClickOfLinksEvent');
    component.onClickOfLinksEvent(event);
    fixture.detectChanges();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('should call onClickOfLinksEvent default case', () => {
    const event = { detail: { eventType: null } };
    component.onClickOfLinksEvent(event);
    let spyMethod;
    spyMethod = spyOn(component, 'onClickOfLinksEvent');
    component.onClickOfLinksEvent(event);
    fixture.detectChanges();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('should call bookingProcessed', () => {
    let spyMethod;
    spyMethod = spyOn(component, 'bookingProcessed');
    component.bookingProcessed();
    fixture.detectChanges();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('should call productLoadedEvent and assign loadedElementRef', () => {
    const event = { detail: { elementRef: 'mock' } };
    const item = {};
    component.productLoadedEvent(event, item);
    fixture.detectChanges();
    expect(item).toEqual({ loadedElementRef: 'mock' });
  });

  it('should call method bookingProcessed on ngOnChanges', () => {
    const spy = jest.spyOn(component, 'bookingProcessed');
    component.ngOnChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call bookingProcessed', () => {
    component.viewModel.productsList = [
      {
        id: 'PROD12345',
        productId: 'fad5b-d9cb-461f-a165-7086772895',
        productType: 'Hotel',
        loadedElementRef: document.createElement('div'),
      },
    ];
    component.bookingProcessed();
    fixture.detectChanges();
    expect(
      component.viewModel.productsList[0].loadedElementRef.getAttribute(
        'bookingStatus'
      )
    ).toEqual('true');
  });
});
