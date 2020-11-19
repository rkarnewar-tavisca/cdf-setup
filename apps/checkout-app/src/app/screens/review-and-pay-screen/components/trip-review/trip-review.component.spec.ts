import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReviewComponent } from './trip-review.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';

describe('TripReviewComponent', () => {
  let component: TripReviewComponent;
  let fixture: ComponentFixture<TripReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TripReviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CoreModule, CultureModule,HttpClientModule],
      providers: [
        {
          provide: CartService,
        }, 
        {
          provide: Cart
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
