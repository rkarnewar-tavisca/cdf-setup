import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoreModule } from '@core/core.module';
import { EmailService } from './email.service';
import Cart from '@orxe-checkout-sdk/cart';

describe('EmailService', () => {
  let cart: Cart;
  let email: EmailService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
      providers: [
        {
          provide: Cart,
          useValue: {
            shareItineraryOperations: jest.fn().mockReturnValue('test'),
          },
        },
      ],
    });
    cart = TestBed.inject(Cart);
    email = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    const service: EmailService = TestBed.get(EmailService);
    expect(service).toBeTruthy();
  });
  test('should apply applyPromoCode', () => {
    const userInfo = {
      type: 'orderCancellation',
      trackingId: '384360',
      transitCode: '7c06c85d-ec7a-4b35-b164-032a7b25de79',
      to: 'kkhude@tavisca.com',
    };
    cart.shareItineraryOperations.shareItinerary = jest.fn();
    email.shareItinerary(userInfo);
    expect(cart.shareItineraryOperations.shareItinerary).toHaveBeenCalled();
  });
});
