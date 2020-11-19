import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonProductDetailPlaceholderComponent } from './addon-product-detail-placeholder.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';

describe('AddonProductDetailPlaceholderComponent', () => {
  let component: AddonProductDetailPlaceholderComponent;
  let fixture: ComponentFixture<AddonProductDetailPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddonProductDetailPlaceholderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CoreModule, CultureModule, HttpClientModule],
      providers: [
        {
          provide: CartService,
        },
        {
          provide: Cart
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonProductDetailPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
