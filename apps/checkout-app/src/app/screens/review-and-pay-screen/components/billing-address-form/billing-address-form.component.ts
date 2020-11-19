import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CultureService } from '@orxe-culture/angular';
import { CheckoutService } from '@shared/services/checkout.service';
import { CHECKOUT_CONST } from '@shared/constants';
import { BILLING_ADDRESS_FORM_CONFIG } from '../../utils';
import { IBillingAddress } from '../../interface/index';
import { BehaviorSubject } from 'rxjs';
import { Validation } from '@orxe-forms/angular';

@Component({
  selector: 'app-billing-address-form',
  templateUrl: './billing-address-form.component.html',
  styleUrls: ['./billing-address-form.component.scss'],
})
export class BillingAddressFormComponent implements OnInit, OnChanges {
  // @Input() savedBillingAddressData: IBillingAddress[] = [];
  @Input() submittedBillingAddressFormData: any;
  @Input() formSubmitted: any;
  @Input() selectedAddressProfile = null;
  @Output() onSubmitFormData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('usMilitaryRef', { static: false }) usMilitary: ElementRef;
  private _selectedProfile = null;
  zipLabel: string = this._cultureService.orxeTranslate(
    BILLING_ADDRESS_FORM_CONFIG.defaultZipCodeLabel
  );
  CHECKOUT_CONST = CHECKOUT_CONST;
  BILLING_ADDRESS_FORM_CONFIG = BILLING_ADDRESS_FORM_CONFIG;
  selectedCountryObject: any;

  dynamicInputFields: any[] = [
    {
      formControlName: 'postalCode',
      fieldName: 'zipCode',
      validator: [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]{1,10}$'),
      ],
    },
    {
      formControlName: 'state',
      fieldName: 'stateDropdown',
      nestedFormControlName: 'code',
      validator: [Validators.required],
    },
    {
      formControlName: 'state',
      fieldName: 'stateInput',
      nestedFormControlName: 'name',
      validator: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
    },
    {
      formControlName: 'postOffice',
      fieldName: 'postOffice',
      validator: [Validators.required],
    },
  ];

  addressData: any[] = [
    {
      optionGroup: [],
    },
  ];
  // TO DO - This will be coming from Country SDK , thats why not creating culture
  countryData: any[] = [
    {
      optionGroup: [
        {
          label: 'United States',
          value: 'United States',
        },
        {
          label: 'India',
          value: 'IN',
        },
        // Currently states lists are staticly driven, and its only for US.
        // so commenting other countries from here
        // {
        //   label: 'Canada',
        //   value: 'CA',
        // },
        // {
        //   label: 'Australia',
        //   value: 'AU',
        // },
      ],
    },
  ];
  // TO DO - This will be coming from State SDK , thats why not creating culture
  stateOptionsMilitary: any[] = [
    {
      optionGroup: [
        {
          label: this._cultureService.orxeTranslate(
            'review-and-pay-screen.state_options.ae'
          ),
          value: 'AE',
        },
        {
          label: this._cultureService.orxeTranslate(
            'review-and-pay-screen.state_options.ap'
          ),
          value: 'AP',
        },
        {
          label: this._cultureService.orxeTranslate(
            'review-and-pay-screen.state_options.aa'
          ),
          value: 'AA',
        },
      ],
    },
  ];
  // TO DO - This will be coming from State SDK , thats why not creating culture
  stateOptions: any[] = [
    {
      optionGroup: [
        {
          label: 'Texas',
          value: 'Tx',
        },
        {
          label: 'New York',
          value: 'Ny',
        },
        {
          label: 'Ohio',
          value: 'Oh',
        },
      ],
    },
  ];
  // TO DO - This will be coming from Profile SDK , thats why not creating culture
  postOfficeList = [
    {
      optionGroup: [
        {
          label: this._cultureService.orxeTranslate(
            'review-and-pay-screen.post_office.apo'
          ),
          value: 'APO',
        },
        {
          label: this._cultureService.orxeTranslate(
            'review-and-pay-screen.post_office.fpo'
          ),
          value: 'FPO',
        },
      ],
    },
  ];

  billingAddressForm: FormGroup = this.fb.group({
    countryCode: [null, [Validators.required]],
    usMilitary: [false],
    line1: [
      null,
      [Validators.required, Validators.pattern("^[a-zA-Z0-9 ',;/.#&-]*$")],
    ],
    line2: [null, [Validators.pattern("^[a-zA-Z0-9 ',;/.#&-]*$")]],
    city: this.fb.group({
      code: [null],
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    }),
    state: this.fb.group({
      code: [null],
      name: [null],
    }),
    postalCode: [null],
    postOffice: [null],
  });

  constructor(
    private fb: FormBuilder,
    public _cultureService: CultureService,
    private _checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    // In case edit address assign selected profile data
    if (this.selectedAddressProfile && this.selectedAddressProfile.id) {
      this.setFormValues(this.selectedAddressProfile);
    } else {
      this.onChangeOfCountry({ detail: 'United States' });
    }
    // this.selectedAddressProfile.subscribe((data) => {
    //   if (data) {
    //     console.log('selected profile - ', data);
    //     this._selectedProfile = data;
    //   } else {
    //     this._selectedProfile = null;
    //   }
    // });
  }

  ngOnChanges() {
    this.updateSubmittedData(this.submittedBillingAddressFormData);
    if (this.formSubmitted && this.formSubmitted.status) {
      this.onSaveChangesBillingAddressForm();
    }
  }

  // In case of edit address
  onSaveChangesBillingAddressForm() {
    if (!this.billingAddressForm.valid) {
      Validation.validateAllFormFields(this.billingAddressForm);
    } else {
      this.submitBillingAddressForm();
    }
  }

  // /**
  //  * On Change of Country Dropdown
  //  */
  onChangeOfCountry(event: any) {
    this.selectedCountryObject = this._checkoutService.findObjectInArray(
      BILLING_ADDRESS_FORM_CONFIG.country,
      'value',
      event.detail
    );
    this.applyValidationOnDynamicInputRendering(this.selectedCountryObject);
    this.billingAddressForm.get('usMilitary').setValue(false);
    if (event.detail === BILLING_ADDRESS_FORM_CONFIG.usMilitary.countryCode) {
      this.billingAddressForm.get('state').get('code').setValue(this.stateOptions[0].optionGroup[0].value);
      this.billingAddressForm.get('state').get('name').setValue(this.stateOptions[0].optionGroup[0].label);
    } else {
      this.billingAddressForm.get('state').get('code').setValue(null);
      this.billingAddressForm.get('state').get('name').setValue(null);
    }
    this.submitBillingAddressForm();
  }
  /**
   * On Change of US Militry checkbox
   */
  onChangeOfUsMilitary(event: any) {
    if (event.detail.checked) {
      this.selectedCountryObject = BILLING_ADDRESS_FORM_CONFIG.usMilitary;
      this.billingAddressForm
        .get('countryCode')
        .setValue(BILLING_ADDRESS_FORM_CONFIG.usMilitary.countryCode);
      this.applyValidationOnDynamicInputRendering(this.selectedCountryObject);
      this.submitBillingAddressForm();
      this.billingAddressForm.get('postOffice').setValue(this.postOfficeList[0].optionGroup[0].value);
      this.billingAddressForm.get('state').get('code').setValue(this.stateOptionsMilitary[0].optionGroup[0].value);
      this.billingAddressForm.get('state').get('name').setValue(this.stateOptionsMilitary[0].optionGroup[0].label);
    } else {
      this.billingAddressForm.get('postOffice').setValue(null);
      this.billingAddressForm.get('state').get('code').setValue(this.stateOptions[0].optionGroup[0].value);
      this.billingAddressForm.get('state').get('name').setValue(this.stateOptions[0].optionGroup[0].label);
      this.selectedCountryObject = null;
      this.onChangeOfCountry({
        detail: BILLING_ADDRESS_FORM_CONFIG.usMilitary.countryCode,
      });
    }
  }

  errorState(fieldName: string): boolean {
    return (
      this.billingAddressForm.get(fieldName).touched &&
      this.billingAddressForm.get(fieldName).errors != null
    );
  }

  onBlurValidateInputs(fieldName: string) {
    // console.log(this.selectedAddressProfile);
    const control = this.billingAddressForm.get(fieldName);
    control.markAsTouched({ onlySelf: true });
    this.submitBillingAddressForm();
  }

  /**
   * @param selectedCountryObject - Config Object to render inputs
   * This method will update validations on the go
   */
  applyValidationOnDynamicInputRendering(selectedCountryObject: any) {
    this.dynamicInputFields.forEach((element: any) => {
      if (
        selectedCountryObject &&
        selectedCountryObject.fields.includes(element.fieldName)
      ) {
        if (element.hasOwnProperty('nestedFormControlName')) {
          let nestedGroup = this.billingAddressForm.controls[
            element.formControlName
          ] as FormGroup;
          nestedGroup.controls[element.nestedFormControlName].setValidators(
            element.validator
          );
          nestedGroup.controls[
            element.nestedFormControlName
          ].updateValueAndValidity();
        } else {
          this.billingAddressForm.controls[
            element.formControlName
          ].setValidators(element.validator);
          this.billingAddressForm.controls[
            element.formControlName
          ].updateValueAndValidity();
        }
      } else {
        if (element.hasOwnProperty('nestedFormControlName')) {
          let nestedGroup = this.billingAddressForm.controls[
            element.formControlName
          ] as FormGroup;
          nestedGroup.controls[element.nestedFormControlName].clearValidators();
          nestedGroup.controls[
            element.nestedFormControlName
          ].updateValueAndValidity();
        } else {
          this.billingAddressForm.controls[
            element.formControlName
          ].clearValidators();

          this.billingAddressForm.controls[
            element.formControlName
          ].updateValueAndValidity();
        }
      }
    });
  }

  setFormValues(data: any) {
    this.billingAddressForm.get('countryCode').setValue(data.countryCode);
    this.billingAddressForm.get('line1').setValue(data.line1);
    this.billingAddressForm.get('line2').setValue(data.line2);
    this.billingAddressForm.get('city').setValue(data.city);
    this.billingAddressForm.get('state').setValue(data.state);
    // TO DO : Need to update this condition once we get codes from state SDK and profile SDK both
    // if (data.state.code) {
    //   this.billingAddressForm
    //     .get('state')
    //     .get('code')
    //     .setValue(data.state.code);
    // } else {
    //   this.billingAddressForm
    //     .get('state')
    //     .get('code')
    //     .setValue(data.state.name);
    // }
    this.billingAddressForm.get('postalCode').setValue(data.postalCode);
    // TO DO : After discussion regarding usMilitary fields in profiles address ection we can set this dynamically
    this.billingAddressForm.get('postOffice').setValue('APO');
    if (data.usMilitary) {
      this.billingAddressForm.get('usMilitary').setValue(true);
      this.onChangeOfUsMilitary({ detail: { checked: true } });
    } else {
      this.billingAddressForm.get('usMilitary').setValue(false);
      this.onChangeOfCountry({ detail: data.countryCode });
    }
  }

  /**
   * Method used to update contact form data from state.
   * In case of user click back button from traveler info page,
   * users previously filled data should be as it is in Billing Address form
   *
   * @param {*} billingAddressFormData
   */
  updateSubmittedData(billingAddressFormData: any): void {
    if (billingAddressFormData) {
      this.setFormValues(billingAddressFormData);
      billingAddressFormData.selectAddress
        ? this.billingAddressForm
          .get('selectAddress')
          .setValue(billingAddressFormData.selectAddress)
        : null;
      Object.keys(this.billingAddressForm.controls).forEach((field) => {
        const control = this.billingAddressForm.get(field);
        control.value ? control.markAsTouched({ onlySelf: true }) : null;
      });
      this.submitBillingAddressForm();
    }
  }

  submitBillingAddressForm() {
    if (this.billingAddressForm.valid) {
      this.onSubmitFormData.emit({
        data: this.billingAddressForm.value,
        valid: this.billingAddressForm.valid,
      });
    }
  }
}
