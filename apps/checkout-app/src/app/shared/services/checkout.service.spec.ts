import { TestBed, inject } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CoreModule } from '@core/core.module';
import { CHECKOUT_CONST } from '../constants/checkout-constant';
import { HttpMocker } from '../utils/http-mocker';
import { AppState } from '@orxe-sdk/app-state';
import Cart from '@orxe-checkout-sdk/cart';
import { async } from 'rxjs/internal/scheduler/async';
import { profile } from 'console';

const overlayData = require('assets/mock/cancel-hotel-overlay-test-data.json');

describe('CheckoutService', () => {
  let service;
  let cart: Cart;
  const cartWithItems = {
    id: '0f8fad5b-d9cb-461f-a165-70867728951z',
    items: [
      {
        id: 'sdea34-d9cb-461f-a165-7086772w324',
        productType: 'hotel',
        dependsOn: {
          itemRefId: 'sdea34-d9cb-461f-a165-7086772w324-i'
        }
      },
      {
        id: 'sdea34-d9cb-461f-a165-7086772w324-i',
        productType: 'insurance',
        dependsOn: {
          itemRefId: 'sdea34-d9cb-461f-a165-7086772w324'
        }
      }
    ],
    price: {
      breakup: {
        paymentOptions: [
          {
            id: '63h6u-d4sb-2asf-a165-q2w123sa',
            rewardId: '98t7u-d4sb-2asf-a165-q2w123sa',
            amount: 1400,
            points: 6000
          }
        ]
      }
    }
  };
  const cartAfterMappedItems = {
    id: '0f8fad5b-d9cb-461f-a165-70867728951z',
    items: [
      {
        id: 'sdea34-d9cb-461f-a165-7086772w324',
        productType: 'hotel',
        dependsOn: {
          itemRefId: 'sdea34-d9cb-461f-a165-7086772w324-i'
        }
      },
      {
        id: 'sdea34-d9cb-461f-a165-7086772w324-i',
        productType: 'insurance',
        dependsOn: {
          itemRefId: 'sdea34-d9cb-461f-a165-7086772w324'
        }
      }
    ],
    addOnProductsList: [
      {
        id: 'sdea34-d9cb-461f-a165-7086772w324-i',
        mainProductType: 'hotel',
        productType: 'insurance',
        dependsOn: {
          itemRefId: 'sdea34-d9cb-461f-a165-7086772w324'
        }
      }
    ],
    productsList: [
      {
        id: 'sdea34-d9cb-461f-a165-7086772w324',
        productType: 'hotel',
        dependsOn: {
          itemRefId: 'sdea34-d9cb-461f-a165-7086772w324-i'
        }
      }
    ],
    price: {
      breakup: {
        paymentOptions: [
          {
            id: '63h6u-d4sb-2asf-a165-q2w123sa',
            rewardId: '98t7u-d4sb-2asf-a165-q2w123sa',
            amount: 1400,
            points: 6000
          }
        ]
      }
    }
  };
  const profile = {
    profile: {
      id: '52lr9ouwask',
      ownerId: '52lr9l9yvm8',
      basicInfo: {
        name: 'kk',
        gender: 'MALE',
        dob: '1990-07-13',
        email: 'jsmith@gmail.com'
      },
      phones: [
        {
          id: '52lr9p3jn9v',
          areaCode: '200',
          type: 'Office',
          countryCode: '+1',
          ext: '123',
          num: '5556136635'
        }
      ],
      emails: [
        {
          id: '52lr9p3uvtf',
          type: 'Business',
          value: 'johnsmith@gmail.com'
        }
      ],
      cards: []
    },
    subProfiles: []
  };
  beforeAll(() => { AppState.init(); });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
      providers: [
        {
          provide: Cart,
          useValue: {
            setHeaders: jest.fn().mockReturnValue('test')
          }
        }
      ]
    });
    service = TestBed.inject(CheckoutService);
    cart = TestBed.inject(Cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive expected output if performAdditionOnArrayByKey method is called', () => {
    const array = [
      { id: 1, amount: 111 },
      { id: 2, amount: 222 }
    ];
    const key = 'amount';
    expect(service.performAdditionOnArrayByKey(array, key)).toStrictEqual(333);
  });

  it('should receive expected output if performAdditionOnArrayByKey method is called with negative value array', () => {
    const array = [
      { id: 1, amount: -111 },
      { id: 2, amount: -222 }
    ];
    const key = 'amount';
    expect(service.performAdditionOnArrayByKey(array, key)).toStrictEqual(333);
  });

  it('should receive expected output if performProductFilterOnCart method', () => {
    const responseObject = service.performProductFilterOnCart(
      cartWithItems,
      'productType',
      CHECKOUT_CONST.ADD_ON_PRODUCT
    );
    expect(responseObject).toEqual(cartAfterMappedItems);
  });

  it('should receive expected output if performProductFilterOnCart method for clp', () => {
    const clpCartWithItems = {
      id: '0f8fad5b-d9cb-461f-a165-70867728951z',
      isClpEnabled: true,
      items: [
        {
          id: 'sdea34-d9cb-461f-a165-7086772w324',
          productType: 'hotel'
        }
      ]
    };
    const clpCartAfterMappedItems = {
      id: '0f8fad5b-d9cb-461f-a165-70867728951z',
      isClpEnabled: true,
      items: [
        {
          id: 'sdea34-d9cb-461f-a165-7086772w324',
          productType: 'hotel'
        }
      ],
      addOnProductsList: [],
      productsList: [
        {
          id: 'sdea34-d9cb-461f-a165-7086772w324',
          productType: 'hotel'
        }
      ]
    };
    const responseObject = service.performProductFilterOnCart(
      clpCartWithItems,
      'productType',
      CHECKOUT_CONST.ADD_ON_PRODUCT
    );
    expect(responseObject).toEqual(clpCartAfterMappedItems);
  });

  it('should test getOverlayData method', inject(
    [HttpTestingController, CheckoutService],
    (httpMock: HttpTestingController, checkoutService: CheckoutService) => {
      HttpMocker.mock('GET', overlayData);
      checkoutService.getOverlayData().subscribe((response: any) => {
        expect(response).toEqual(overlayData);
      });
    }
  ));

  it('should receive expected output if findObjectInArray method with nested object array', () => {
    const array = [
      {
        id: 12,
        name: 'XYZ'
      }
    ];
    const responseObject = service.findObjectInArray(array, 'id', 12);
    expect(responseObject).toEqual({
      id: 12,
      name: 'XYZ'
    });
  });

  it('should receive expected output if findObjectInArray method', () => {
    const array = [12];
    const responseObject = service.findObjectInArray(array, null, 12);
    expect(responseObject).toEqual(12);
  });
  it('should call setHeader and set header value', () => {
    service.setHeaders('header', 'values');
    expect(service).toBeTruthy();
  });
  it('should test getSettings method', inject(
    [HttpTestingController, CheckoutService],
    (httpMock: HttpTestingController, checkoutService: CheckoutService) => {
      HttpMocker.mock('GET', 'test');
      checkoutService.getSettings().subscribe((response: any) => {
        expect(response).toEqual('test');
      });
    }
  ));

  it('should test setHeaders method', () => {
    cart.setHeaders = jest.fn();
    cart.setHeaders({
      'cnx-tenantid': 'tenantId'
    });
    service.setHeaders();
  });
});
