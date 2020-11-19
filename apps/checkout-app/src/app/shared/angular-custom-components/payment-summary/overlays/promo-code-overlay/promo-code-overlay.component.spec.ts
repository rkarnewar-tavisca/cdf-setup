import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule
} from '@angular/forms';
import { PromoCodeOverlayComponent } from './promo-code-overlay.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaymentSummaryService } from '../../services/payment-summary.service';
import { CultureModule, CultureService } from '@orxe-culture/angular';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { of, BehaviorSubject, Observable } from 'rxjs';
describe('ApplyPromoOverlayComponent', () => {
  let component: PromoCodeOverlayComponent;
  let fixture: ComponentFixture<PromoCodeOverlayComponent>;
  let service: PaymentSummaryService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodeOverlayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        OrxeFormsModule,
        CultureModule,
        FormsModule
      ],
      providers: [
        {
          provide: PaymentSummaryService,
          useValue: {
            applyPromoCode: jest.fn().mockReturnValue(new Observable())
          }
        },
        {
          provide: CultureService,
          useValue: {
            orxeTranslate: jest.fn().mockReturnValue('New')
          }
        }
      ]
    }).compileComponents();
    service = TestBed.inject(PaymentSummaryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create promocodeOverlayComponent', () => {
    expect(component).toBeTruthy();
  });

  test(`should set isOpen to false when discardPromo method is called`, () => {
    component.discardPromo();
    // TODO: Need to write actual test case when business logic is written
    expect(component.isOpen).toBeFalsy();
  });
  test(`should return success response promo code`, () => {
    const res = {
      item: []
    };
    const promocode = 'Lucky100';
    component.checkPromoCodeResponse(res, promocode);
    expect(component.errorState).toBeFalsy();
    expect(component.promoResp).not.toBeNull();
  });
  test(`should return failure response promo code`, () => {
    const res = {
      code: '554'
    };
    const promocode = 'Lucky100';
    component.checkPromoCodeResponse(res, promocode);
    // TODO: Need to write actual test case when business logic is written
    expect(component.errorState).toBeTruthy();
  });
  test(`should called onBlurValidateInputs promo code`, () => {
    const str = 'promocode';
    component.promoCodeForm.controls[str].setValue('');
    component.promoCodeForm.controls[str].markAsTouched();
    fixture.detectChanges();
    component.onBlurValidateInputs();
    expect(component.errorState).toBeFalsy();
  });
  test(`should called validatePromocode method`, () => {
    const str = 'promocode';
    component.promoCodeForm.controls[str].setValue('promo');
    fixture.detectChanges();
    component.validatePromocode(str);
    expect(component.disableBtn).toBeFalsy();
  });
  test(`should called applyPromoCode service`, () => {
    component.applyPromo('luck');
    const spy = spyOn(component, 'promoCode');
    component.promoCode('lucky100');
    expect(spy).toHaveBeenCalled();
  });
});
