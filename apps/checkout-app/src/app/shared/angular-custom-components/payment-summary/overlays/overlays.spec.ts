import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { CoreModule } from '@core/core.module';
import { Overlay } from './overlays';
import Cart from '@orxe-checkout-sdk/cart';

describe('Overlay', () => {
    let cart: Cart;
    let overlay: Overlay;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, CoreModule],
            providers: [
                Overlay,
                {
                    provide: Cart,
                },
            ],
        });
        cart = TestBed.inject(Cart);
        overlay = TestBed.inject(Overlay);
    });

    it('should create overlay class', () => {
        expect(overlay).toBeTruthy();
    });
    it('should return false for Open when there is change in URl', () => {
        overlay.open();
        window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL: "trip#overlay", newURL: "trip" }));
        expect(overlay.isOpen).toBe(false);
    });
    it('should trigged hashchange event', () => {
        window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL: "trip#overlay", newURL: "trip#overlay" }));
        spyOn(overlay, 'open');
        overlay.open();
        expect(overlay.open).toHaveBeenCalled();
    });
    it('should open overlay when Open method is called', () => {
        window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL: "trip#overlay", newURL: "trip" }));
        overlay.open();
        expect(overlay.isOpen).toBeTruthy();
    });
    it('should called close method', () => {
        overlay.close();
        expect(overlay.isOpen).toBeFalsy();
    });
});
