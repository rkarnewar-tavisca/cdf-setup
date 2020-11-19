import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoComponent } from './payment-info.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';

describe('PaymentInfoComponent', () => {
  let component: PaymentInfoComponent;
  let fixture: ComponentFixture<PaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInfoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CultureModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create payment-info component', () => {
    expect(component).toBeTruthy();
  });
});
