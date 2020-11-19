import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { PaymentSummaryService } from './payment-summary.service';
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
  let cart: Cart;
  let payment: PaymentSummaryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
      providers: [
        {
          provide: Cart,
          useValue: {
            paymentOperations: jest.fn().mockReturnValue('test'),
          },
        },
      ],
    });
    cart = TestBed.inject(Cart);
    payment = TestBed.inject(PaymentSummaryService);
  });

  it('should be created', () => {
    expect(payment).toBeTruthy();
  });
  it('should called setcartDetails method', () => {
    const cartDetail = { id: '33434ses' };
    payment.setCartDetails(cartDetail);
    let getCart = payment.getCartDetails();
    expect(payment.cartDetails).toEqual(cartDetail);
    expect(payment.cartDetails).toEqual(getCart);
  });
  it('should called getcartDetails', () => {
    const cartDetail = { id: '33434ses' };
    payment.setCartDetails(cartDetail);
    let getCart = payment.getCartDetails();
    expect(payment.cartDetails).toEqual(getCart);
  });
  test('should apply applyPromoCode', () => {
    const cartDetail = { id: '33434ses', currency: 'USD' };
    payment.setUserDetails(cartDetail);
    payment.setCartDetails(cartDetail);
    cart.paymentOperations.applyPromoCode = jest.fn();
    payment.applyPromoCode('Lucky100');
    expect(cart.paymentOperations.applyPromoCode).toHaveBeenCalled();
  });
  it('should apply payment options',()=>{
    cart.paymentOperations.applyPaymentOption = jest.fn();
    payment.applyPaymentOptions({});
    expect(cart.paymentOperations.applyPaymentOption).toHaveBeenCalled();
  })
  it('should call removePromoCode and get cart response ', () => {
    const cartDetail = { id: '33434ses', currency: 'USD' };
    payment.setUserDetails(cartDetail);
    payment.setCartDetails(cartDetail);
    cart.paymentOperations.removePromoCode = jest.fn();
    payment.removePromoCode('Lucky100');
    expect(cart.paymentOperations.removePromoCode).toHaveBeenCalled();
  });
});
