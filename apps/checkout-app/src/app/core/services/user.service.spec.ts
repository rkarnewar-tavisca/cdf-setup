import { async, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import Cart, { AddOrUpdateProfilesRequest, AddOrUpdateProfilesResponse } from '@orxe-checkout-sdk/cart';
import { connect } from '@orxe-store/connect';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoreModule } from '@core/core.module';
describe('UserService', () => {
  let httpMock: HttpTestingController;
  let testService: UserService;
  let cart: Cart;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
      providers: [
        UserService,
        {
          provide: Cart,
          useValue: {
            profileOperations: jest.fn().mockReturnValue('test'),
          },
        },
        {
          provide: connect,
          useValue: {
            connect: jest.fn(),
          },
        },
      ],
    });
    testService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    cart = TestBed.inject(Cart);
  });

  it('should create user service', () => {
    expect(testService).toBeTruthy();
  });
  it('should called getuser method', async () => {
    const userInfo = '../../../assets/user.json';
    testService.getUser().subscribe((res) => {
      expect(res).toEqual(userInfo);
    });
    httpMock.verify();
  });
  it('should call getUserProfile method', async () => {
    cart.profileOperations.getProfiles = jest.fn();
    testService.getUserProfile();
    expect(cart.profileOperations.getProfiles).toHaveBeenCalled();
  });
  it('should call updateUserProfiles method', async () => {
    cart.profileOperations.addOrUpdateProfiles = jest.fn();
    const request: AddOrUpdateProfilesRequest = {
      productParticipant: {
        product: { id: 'test', type: 'test' },
        productParticipantBlob: 'test'
      },
      profiles: []
    };
    testService.updateUserProfiles(request);
    expect(cart.profileOperations.addOrUpdateProfiles).toHaveBeenCalled();
  });
});
