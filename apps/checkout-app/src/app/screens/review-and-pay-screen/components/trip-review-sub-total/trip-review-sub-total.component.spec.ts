import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripReviewSubTotalComponent } from './trip-review-sub-total.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';

describe('TripReviewSubTotalComponent', () => {
  let component: TripReviewSubTotalComponent;
  let fixture: ComponentFixture<TripReviewSubTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripReviewSubTotalComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripReviewSubTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
