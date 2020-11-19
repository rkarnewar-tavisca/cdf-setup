import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';

import { BillingInfoSummaryComponent } from './billing-info-summary.component';

describe('BillingInfoSummaryComponent', () => {
  let component: BillingInfoSummaryComponent;
  let fixture: ComponentFixture<BillingInfoSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillingInfoSummaryComponent],
      imports: [CultureModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check billing summary element created when values assign', () => {
    component.billingFormValues = {
      savedCard: 'sddwe-123',
      cardHolderName: 'John Doe',
      number: '**** **** **** 1111',
      cvv: null,
      expirationDate: {
        month: 10,
        year: 2022,
      },
    };
    fixture.detectChanges();
    const billingTextElement = fixture.debugElement.nativeElement.querySelector(
      '.billing__text--label'
    );
    expect(billingTextElement).toBeTruthy();
  });
});
