import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { selectUser, selectUserSession } from '@core/store/selectors/user.selectors';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartService } from './cart.service';
import { getInitialState } from '@core/store/state/app.state';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import {
  HttpEvent,
  HttpEventType,
  HttpClientModule,
} from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import Cart from '@orxe-checkout-sdk/cart';
describe('CartService', () => {
  let service;
  let cartResponse = require('../../../assets/mock/review-screen/cart-single-product-clp.json');
  let cart: Cart;
  let store: MockStore;
  const mockState = getInitialState();
  const mockSelectUser = { name: 'abc', email: 'abc@abc.com', phone: '88888888', id: '123' }
  const mockUserSession = { name: 'abc', email: 'abc@abc.com', phone: '88888888', userId: '123' }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
      providers: [
        {
          provide: Cart,
          useValue: {
            getPriceCart: jest.fn().mockReturnValue('test'),
            getCart: jest.fn().mockReturnValue('test'),
            deleteItemFromCart: jest.fn().mockReturnValue('test')
          },
        },
        provideMockStore({
          initialState: mockState,
          selectors: [{ selector: selectUser, value: mockSelectUser }, { selector: selectUserSession, value: mockUserSession }],
        }),
      ],
    });
    service = TestBed.inject(CartService);
    cart = TestBed.inject(Cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call getCart method', () => {
    let spyMethod;
    spyMethod = spyOn(cart, 'getCart');
    service.getCart();
    expect(spyMethod).toHaveBeenCalled();
  });
  it('should be call getPriceCart method', () => {
    let spyMethod;
    spyMethod = spyOn(cart, 'getPriceCart');
    service.getPriceCart();
    expect(spyMethod).toHaveBeenCalled();
  });
  it('should call removeItemFromCart and get cart response ', () => {
    const mockReq = {
      "itemId": "123",
      "currency": "USD"
    }
    const spyMethod = spyOn(cart, 'deleteItemFromCart');
    service.removeItemFromCart(mockReq);
    expect(spyMethod).toBeCalled();
  });
});
