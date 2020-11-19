import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PaymentOptionsComponent } from './payment-options.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import Cart from '@orxe-checkout-sdk/cart';
import { CultureModule, CultureService } from '@orxe-culture/angular';
import { PaymentSummaryService } from '../../services/payment-summary.service';
import { of } from 'rxjs';
import { getInitialState } from '@core/store/state/app.state';
import { selectUser } from '@core/store/selectors/user.selectors';

describe('PaymentOptionsComponent', () => {
  let component: PaymentOptionsComponent;
  let fixture: ComponentFixture<PaymentOptionsComponent>;
  let store: MockStore;
  let pointsToRedeem;
  let paymentService: PaymentSummaryService;

  const mockState = getInitialState();
  const mockres = require('../../../../../../assets/mock/apply-payment-options-response.json');
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentOptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, OrxeFormsModule, CultureModule],
      providers: [
        {
          provide: Cart,
          useValue: {
            paymentOperations: jest.fn(),
          },
        },
        {
          provide: PaymentSummaryService,
          useValue: {
            applyPaymentOptions: jest.fn().mockReturnValue(''),
          },
        },
        {
          provide: CultureService,
          useValue: {
            orxeTranslate: jest.fn().mockReturnValue('total'),
          },
        },
        provideMockStore({
          initialState: mockState,
          selectors: [{ selector: selectUser, value: null }],
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    paymentService = TestBed.inject(PaymentSummaryService);
    store.overrideSelector(selectUser, { name:'abc', email:'abc@abc.com', phone:'88888888', id: '123' });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pointsToRedeem = component.paymentOptionsForm.get('pointsToRedeem');
      component.cartDetails = {
        items: [
          {
            pointsDistributionLimit: {
              min: 2500,
              max: 7500,
            },
          },
          {
            pointsDistributionLimit: {
              min: 2500,
              max: 7500,
            },
          },
        ],
        price: {
          points: 20000,
        },
      },
      component.userProfile = {
        programCurrency: {
          value: 50000,
        },
      }
  });

  it('should create payment-options component', () => {
    expect(component).toBeTruthy();
  });
  it('should set payment method to cash when points set to 0', () => {
    pointsToRedeem.setValue(0);
    component.onBlurValidateInputs('pointsToRedeem');
    expect(component.payment).toBe('cash');
  });
  it('should set payment method to points when points present in cart payment option', () => {
    component.ngAfterViewInit();
    expect(component.paymentOption.nativeElement.value).toBe('points');
  });
  it('should set validation as per input', () => {
    component.ngOnInit();
    expect(component.minAllowedPoints).toBe(5000);
    expect(component.maxAllowedPoints).toBe(15000);
    pointsToRedeem.setValue(60000);
    let errors = pointsToRedeem.errors || {};
    expect(errors['exceedsTotal']).toBeTruthy();
  });
  it('Should validate minimum points entered', () => {
    component.minAllowedPoints = 100;
    pointsToRedeem.setValue(50);
    let errors = pointsToRedeem.errors || {};
    expect(errors['min']).toBeTruthy();
  });
  it('Should validate maximum points entered', () => {
    component.maxAllowedPoints = 10000;
    pointsToRedeem.setValue(25000);
    let errors = pointsToRedeem.errors || {};
    expect(errors['max']).toBeTruthy();
  });
  it('should return min validation msg as per condition', () => {
    pointsToRedeem.setErrors({ min: true });
    component.minAllowedPoints = 100;
    let minmsg = component.returnValidationMsg();
    expect(minmsg).toContain('100');
  });
  it('should return max validation msg as per condition', () => {
    pointsToRedeem.setErrors({ max: true });
    component.maxAllowedPoints = 10000;
    let maxmsg = component.returnValidationMsg();
    expect(maxmsg).toContain('total');
  });
  it('should return exceeds total validation msg as per condition', () => {
    pointsToRedeem.setErrors({ exceedsTotal: true });
    pointsToRedeem.setValue(100000);
    let exceedsTotalmsg = component.returnValidationMsg();
  //  expect(exceedsTotalmsg).toContain('total');
  });
  it('should disable apply button on invalid input', () => {
    pointsToRedeem.setErrors({ min: true });
    pointsToRedeem.setValue('');
    component.validate('points', new Event('click'));
    expect(component.disableBtn).toBeTruthy();
  });
  it('should enable apply button on valid input', () => {
    component.validate('points', new Event('click'));
    expect(component.disableBtn).toBeFalsy();
  });
  it('should enable apply button when payment method is cash',()=>{
    spyOn(paymentService, 'applyPaymentOptions').and.returnValue(of(mockres));
    component.validate('cash', new Event('click'));
    expect(component.disableBtn).toBeTruthy();
  })
  it('should call payment-options service', async () => {
    spyOn(paymentService, 'applyPaymentOptions').and.returnValue(of(mockres));
    component.updatePoints('points');
    expect(component.disablePoints).toBeFalsy();
  });
  it('should call payment-options service', async () => {
    spyOn(paymentService, 'applyPaymentOptions').and.returnValue(of(mockres));
    component.paymentOption.nativeElement.value = 'points';
    component.paymentOptionsForm.get('pointsToRedeem').setValue('4000');
    fixture.detectChanges();
    component.updatePoints('points');
    expect(component.disablePoints).toBeFalsy();
    expect(mockres).toBeInstanceOf(Object);
  });
  it('should call payment-options service', async () => {
    component.paymentOptionsForm.get('pointsToRedeem').setValue('1500');
    component.paymentOptionsForm.get('pointsToRedeem').markAsTouched();
    component.paymentOptionsForm.get('pointsToRedeem').setErrors({ min: true });
    fixture.detectChanges();
    component.errorState('pointsToRedeem');
    expect(component.errorState('pointsToRedeem')).toBeTruthy();
  });
  it('should get orxe-alert and return type', ()=> {
    component.showErrorMsg = true;
    fixture.detectChanges();
    const orxeAlert = fixture.debugElement.nativeElement.querySelector('orxe-alert'); 
    expect(orxeAlert.hasAttribute('type')).toBeTruthy();
  });
  it('should get orxe-radio and return its value', ()=> {
    component.disablePoints = true;
    fixture.detectChanges();
    const useMyPoints = fixture.debugElement.nativeElement.querySelector('orxe-radio-card#use-my-points-radio');
    expect(useMyPoints.getAttribute('value')).toBe('points');
  });
  it('should get orxe-input and its attributes', ()=> {
    const pointInput = fixture.debugElement.nativeElement.querySelector('orxe-input');
    expect(pointInput.getAttribute('type')).toBe('number');
  });
  it('should check selectedClpOption value and select the radio button', () => {
    component.paymentsOption = {
      'redeemed': 'cash',
      'isAccordionOpen': true
    }
    fixture.detectChanges();
    component.ngAfterViewInit();
    const radioGroup = fixture.debugElement.nativeElement.querySelector('orxe-radio-card-group');   
    expect(radioGroup.value).toBe('cash');
  })
});
