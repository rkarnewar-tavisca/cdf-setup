import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Cart from '@orxe-checkout-sdk/cart';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { CultureModule, CultureService } from '@orxe-culture/angular';
import { CartService } from '@shared/services/cart.service';

import { BillingAddressFormComponent } from './billing-address-form.component';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '@store/state/app.state';

let mockStore: MockStore<IAppState>;
let data = {
  id: "k10g4e1hj6q",
  type: "usMilitary",
  line1: "1010 South connexions loyalty Boulevard",
  line2: "South Northern Ireland MS 110001",
  city: {
    code: "AUS",
    name: "Austin"
  },
  state: {
    name: "Texas",
    code: "TX"
  },
  countryCode: "United States",
  postalCode: "73301",
  profileName: "John Smith",
  profileId: "5080n7f1ugo",
  isSubProfile: false,
  subProfileId: null
};


describe('BillingAddressFormComponent', () => {
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillingAddressFormComponent],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCart: jest.fn().mockReturnValue('test'),
          },
        },
        {
          provide: Cart,
        },
        {
          provide: CultureService,
          useValue: {
            orxeTranslate: jest.fn().mockReturnValue('New'),
          },
        },
        provideMockStore({
          initialState: {},
        }),
      ],
      imports: [
        CultureModule,
        ReactiveFormsModule,
        OrxeFormsModule,
        HttpClientModule,
        FormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressFormComponent);
    component = fixture.componentInstance;
    component.onChangeOfCountry({ detail: 'US' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call errorState method and return error', () => {
    let data = component.errorState('line1');
    fixture.detectChanges();
    expect(data).toEqual(false);
  });

  it('should call onBlurValidateInputs method and return error', () => {
    component.onBlurValidateInputs('line1');
    fixture.detectChanges();
    expect(component.onBlurValidateInputs).toBeTruthy();
  });

  it('should call onChangeOfCountry method and reset usMilitary checkbox', () => {
    const spyMethod = spyOn(component, 'submitBillingAddressForm');
    component.onChangeOfCountry({ detail: 'US' });
    fixture.detectChanges();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('should call onChangeOfCountry method and set usMilitary checkbox as false', () => {
    const spyMethod = spyOn(component, 'submitBillingAddressForm');
    component.onChangeOfCountry({ detail: 'IN' });
    fixture.detectChanges();
    expect(spyMethod).toHaveBeenCalled();
  });

  it('should call onChangeOfUsMilitary method and set countryCode to US', () => {
    component.onChangeOfUsMilitary({ detail: { checked: true } });
    fixture.detectChanges();
    expect(component.billingAddressForm.controls.countryCode.value).toBe(
      'United States'
    );
  });

  it('should call onChangeOfUsMilitary method and reset countryCode dropdown', () => {
    component.onChangeOfUsMilitary({ detail: { checked: false } });
    fixture.detectChanges();
    expect(component.billingAddressForm.controls.countryCode.value).toBe(null);
  });


  it('should call updateSubmittedData', () => {
    component.updateSubmittedData(data);
    fixture.detectChanges();
    expect(component.billingAddressForm.controls.countryCode.value).toBe('United States');
  });

  it('should set form value when selectedAddressProfile is there', () => {
    component.selectedAddressProfile = {
      id: '123',
      countryCode: 'US',
      line1: 'line',
      line2: 'line',
      city: {
        code: '123',
        name: 'Pune'
      },
      state: {
        code: '123',
        name: 'MH'
      },
      postalCode: '1234'
    }
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.billingAddressForm.get('countryCode').value).toBe('US');
  })
});
