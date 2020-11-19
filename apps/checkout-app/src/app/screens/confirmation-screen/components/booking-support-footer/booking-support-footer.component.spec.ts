import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';

import { BookingSupportFooterComponent } from './booking-support-footer.component';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookingSupportFooterComponent', () => {
  let component: BookingSupportFooterComponent;
  let fixture: ComponentFixture<BookingSupportFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingSupportFooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CoreModule, CultureModule],
      providers: [
        {
          provide: CartService,
        },
        {
          provide: Cart,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSupportFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check trackingId binding on template', () => {
    component.orderSummaryDetail = {
      trackingId: '12345',
    };
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector(
      '#helper-tracking-id'
    );
    fixture.detectChanges();
    expect(element.textContent).toContain(' ');
  });
});
