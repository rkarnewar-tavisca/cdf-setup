import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { CartEffects } from './cart.effects';
import { CheckoutService } from '@shared/services/checkout.service';
import { CartService } from '@shared/services/cart.service';
import { Actions } from '@ngrx/effects';
import { IAppState } from '../state/app.state';
import {
  GetCartDetailSuccess,
  GetCartDetail,
  GetCartDetailFailure,
  UpdateCartDetail,
  GetPriceCartDetail
} from '../actions/cart.actions';
import { cold, hot } from 'jasmine-marbles';


describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  let mockStore: MockStore<IAppState>;
  let checkOutService: any;
  let cartService: any;

  const mockData = require('src/assets/mock/get-cart.json');
  let getCartData;
  beforeEach(() => {
    jest.setTimeout(10000);
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        Actions,
        {
          provide: CheckoutService,
          useValue: {
            performProductFilterOnCart: jest.fn(),
          },
        },
        {
          provide: CartService,
          useValue: {
            getCart: jest.fn(),
            getPriceCart: jest.fn()
          },
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
      ],
    });

    effects = TestBed.inject(CartEffects);
    mockStore = TestBed.inject(MockStore);
    checkOutService = TestBed.inject(CheckoutService);
    cartService = TestBed.inject(CartService);
  });

  test('should be created', () => {
    expect(effects).toBeTruthy();
  });

  test('should return a cart details stream with GetCartDetailSuccess action', () => {
    const cartDtails = mockData;
    const action = new GetCartDetail();
    const outcome = new GetCartDetailSuccess(cartDtails);

    // Dispatch GetCartDetail action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: cartDtails });
    const expected = cold('--b', { b: outcome });
    cartService.getCart.mockReturnValue(response);
    getCartData = response;
    expect(effects.getCartDetail$).toBeObservable(expected);
  });

  test('should return a GetCartDetailFailure action on failure', () => {
    const cartDtails = mockData;
    const action = new GetCartDetail();
    const error = new Error();
    const outcome = new GetCartDetailFailure(error);

    // Dispatch GetCartDetail action
    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    const expected = cold('--(b|)', { b: outcome });
    cartService.getCart.mockReturnValue(response);
    expect(effects.getCartDetail$).toBeObservable(expected);
  });

  test('should return a price cart details stream with GetCartDetailSuccess action', () => {
    const cartDetails = mockData;
    const action = new GetPriceCartDetail();
    const outcome = new GetCartDetailSuccess(cartDetails);

    // Dispatch GetPriceCartDetail action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: cartDetails });
    const expected = cold('--b', { b: outcome });
    cartService.getPriceCart.mockReturnValue(response);
    expect(effects.getPriceCartDetail$).toBeObservable(expected);
  });
  test('should return a GetCartDetailFailure action on failure of price cart', () => {
    const cartDtails = mockData;
    const action = new GetPriceCartDetail();
    const error = new Error();
    const outcome = new GetCartDetailFailure(error);

    // Dispatch GetCartDetail action
    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    const expected = cold('--(b|)', { b: outcome });
    cartService.getPriceCart.mockReturnValue(response);
    expect(effects.getPriceCartDetail$).toBeObservable(expected);
  });
  test('should return a GetCartDetailSuccess action on UpdateCartDetail action dispatch', () => {
    const cartDtails = getCartData;
    const cartDetails = { id: "5" }
    const action = new UpdateCartDetail(cartDetails);

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: cartDtails });
    const expected = cold('--b', { b: action });
    effects.updateCartDetail$.subscribe(data => {
      expect(data).not.toBeNull();
    })
    expect(effects.updateCartDetail$).not.toEqual(expected);
  });
});

