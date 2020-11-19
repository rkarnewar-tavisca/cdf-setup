import { TestBed, inject } from '@angular/core/testing';

import { TravelerInfoService } from './traveler-info.service';
import {
    HttpTestingController,
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import {
    HttpClientModule,
} from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import Cart from '@orxe-checkout-sdk/cart';


describe('Travler Info service', () => {
    let service;
    let cart: Cart;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
            providers: [{
                provide: Cart,
            }]
        });
        service = TestBed.inject(TravelerInfoService);
        cart = TestBed.inject(Cart);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});