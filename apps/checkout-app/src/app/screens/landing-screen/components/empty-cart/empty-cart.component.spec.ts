import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EmptyCartComponent } from './empty-cart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '@orxe-sdk/app-state';
import Cart from '@orxe-checkout-sdk/cart';
import { UserSessionService } from '@core/services';
import { of, Observable } from 'rxjs';
describe('EmptyCartComponent', () => {
  let cart: Cart;
  let component: EmptyCartComponent;
  let fixture: ComponentFixture<EmptyCartComponent>;

  const addToCartResponse = {
    items: [],
    id: '123',
  };
  const sessionResponse = {
    token: '123366',
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyCartComponent],
      imports: [
        CultureModule,
        ReactiveFormsModule,
        OrxeFormsModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Cart,
        },
        {
          provide: UserSessionService,
          useValue: {
            createCheckoutSession: jest.fn().mockImplementation((session) => {
              return of(sessionResponse);
            }),
            setAppState: jest.fn().mockReturnValue('test'),
            addItemToCart: jest.fn().mockImplementation((cart) => {
              return of(addToCartResponse);
            }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeAll(() => {
    AppState.init();
  });
  test('should render empty cart', () => {
    expect(component).toBeTruthy();
  });

  test('should click on product and callback should invoked', () => {
    spyOn(component, 'onClickProduct');
    const button = fixture.debugElement.nativeElement.querySelector(
      'div.product__navigation'
    );
    button.click();
    expect(component.onClickProduct).toBeCalled();
  });

  test('should change product isactive status to true when onClickProduct function called', () => {
    const mockProduct = { name: 'Flights', icon: 'ic-flight' };
    component.onClickProduct(mockProduct);
    expect(component.activeTab).toEqual(mockProduct.name);
  });
  test('should call updateSession and store in AppState', () => {
    component.userControl.value.selectedflowType = 'clp';
    fixture.detectChanges();
    component.updateSession();
    expect(component.viewModel.addToCartBtn).toBeFalsy();
  });
  test('should call addTocart method and return cart item details', () => {
    const addTocart = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#addToCartBtn'
    );
    addTocart.click();
    expect(component.userControl.value.amount).toBe(100);
  });
});
