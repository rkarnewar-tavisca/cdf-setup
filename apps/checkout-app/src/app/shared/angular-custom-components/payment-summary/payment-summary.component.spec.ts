import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSummaryComponent } from './payment-summary.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CultureModule } from '@orxe-culture/angular';
import { PaymentSummaryService } from './services/payment-summary.service';
describe('PaymentSummaryComponent', () => {
  let component: PaymentSummaryComponent;
  let fixture: ComponentFixture<PaymentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, HttpClientTestingModule, CultureModule],
      providers: [
        {
          provide: PaymentSummaryService,
          useValue: {
            setCartDetails: jest.fn().mockReturnValue('test'),
            setUserDetails: jest.fn().mockReturnValue('test'),
          },
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call updateCartResponse event and emit updateCart event', () => {
    spyOn(component.updateCart, 'emit');
    component.updateCartResponse('promo-code');
    expect(component.updateCart.emit).toHaveBeenCalledWith('promo-code')
  });
  test('should get payment summary heading from span and its class', ()=> {
    const paymentSummaryHeading = fixture.debugElement.nativeElement.querySelector('#payment-summary-heading');
    expect(paymentSummaryHeading.classList.contains('container__payment-summary-heading')).toBeTruthy();
  });
});
