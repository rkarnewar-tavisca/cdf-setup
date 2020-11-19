import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { OrderService } from './order.service';
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
import { HttpMocker } from '../utils/http-mocker';
import Cart from '@orxe-checkout-sdk/cart';

describe('OrderService', () => {
  let service;
  let orderStatus = require('../../../assets/mock/review-screen/cart-single-product-clp.json');
  let trackingId = '123';
  let cart;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
      providers: [
        {
          provide: Cart,
          useValue: {
            getBookingStatus: jest.fn().mockReturnValue('test'),
            orderOperations: jest.fn().mockReturnValue('test'),
          },
        },
      ],
    });
    service = TestBed.inject(OrderService);
    cart = TestBed.inject(Cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call getOrderStatus method', () => {
    const spyMethod = spyOn(service, 'getBookingStatus');
    service.getBookingStatus({ trackingId: '12345' });
    expect(spyMethod).toHaveBeenCalled();
  });
  it('should be call getBookingStatus method', () => {
    cart.orderOperations.getOrderStatus = jest.fn();
    service.getBookingStatus({ trackingId: '1' });
    expect(cart.orderOperations.getOrderStatus).toHaveBeenCalled();
  })
  it('should be call getOrder method', () => {
    cart.orderOperations.getOrder = jest.fn();
    service.getOrder({ trackingId: '1' });
    expect(cart.orderOperations.getOrder).toHaveBeenCalled();
  })
  it('should be call orderInitiate method', () => {
    cart.orderOperations.placeOrder = jest.fn();
    service.orderInitiate({ item: {} });
    expect(cart.orderOperations.placeOrder).toHaveBeenCalled();
  })
});
