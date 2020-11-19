import { async, TestBed } from '@angular/core/testing';
import { UserSessionService } from './user-session.service';
import Cart from '@orxe-checkout-sdk/cart';
import { AppState } from '@orxe-sdk/app-state';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoreModule } from '@core/core.module';
describe('UserSessionService', () => {
  let testService: UserSessionService;
  let cart: Cart;
  beforeAll(() => {
    AppState.init();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule],
      providers: [
        UserSessionService,
        {
          provide: Cart,
          useValue: {
            sessionOperation: jest.fn().mockReturnValue('test'),
            addToCart: jest.fn().mockReturnValue('test')
          },
        },
      ],
    });
    testService = TestBed.inject(UserSessionService);
    cart = TestBed.inject(Cart);
  });

  it('should create user service', () => {
    expect(testService).toBeTruthy();
  });
  it('should call createCheckoutSession method', async () => {
    cart.sessionOperation.createSession = jest.fn();
    testService.createCheckoutSession("clpId");
    expect(cart.sessionOperation.createSession).toHaveBeenCalled();
  });
  it('should call setAppState method', async () => {
    cart.setHeaders = jest.fn();
    testService.setAppState("token");
    expect(cart.setHeaders).toHaveBeenCalled();
  });
});
