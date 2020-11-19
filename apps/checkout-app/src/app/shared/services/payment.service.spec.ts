import { TestBed } from '@angular/core/testing';
import { HttpMocker } from '../utils/http-mocker';
import { PaymentService } from './payment.service';
import Cart from '@orxe-checkout-sdk/cart';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectCartDetail } from '../../core/store/selectors/cart.selectors';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockStore: MockStore;
  let sdkInstance: Cart;
  const response = require('assets/mock/apply-payment-options-response.json');
  const mockRequest = require('assets/mock/apply-payment-options-request.json');

  const mockState = {
    cart: {
      cartInfo: {
        cartDetails: { id: 'cart_id' },
        appFlow: '',
        paymentOptions: null,
        products: [],
      },
      loading: false,
    },
    user: {
      currentUser: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: mockState,
        }),
        {
          provide: Cart,
          useValue: {
            paymentOperations : jest.fn().mockReturnValue('test'),
            applyPaymentOption:jest.fn().mockRejectedValue('test')
          }
        },
      ],
    });
    service = TestBed.inject(PaymentService);
    mockStore = TestBed.inject(MockStore);
    sdkInstance = TestBed.inject(Cart);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });


});
