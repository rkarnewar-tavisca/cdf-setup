import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Validation } from '@orxe-angular/forms';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { CultureService } from '@orxe-culture/angular';
import { IBillingAddress } from '../../interface/index';
import { BILLING_ADDRESS_FORM_CONFIG } from '../../utils/billing-address-form-config';
import { CheckoutService } from '@shared/services/checkout.service';
import { BehaviorSubject } from 'rxjs';
import { BillingAddressSummaryComponent } from '../billing-address-summary/billing-address-summary.component';
import { BillingAddressFormComponent } from '../billing-address-form/billing-address-form.component';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss'],
})
export class BillingAddressComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('loadDynamicComponent', { read: ViewContainerRef, static: false })
  loadComponent: ViewContainerRef;

  @Input() savedBillingAddressData: IBillingAddress[] = [];
  @Input() submittedBillingAddressFormData: any;
  @Input() newCardFlag = false;
  @Input() selectedCardProfile: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  @Output() onSubmitFormData: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSaveBillingAddress: EventEmitter<any> = new EventEmitter<any>();
  private addressSummaryComponent: ComponentRef<
    BillingAddressSummaryComponent
  > = null;
  private addressFormComponent: ComponentRef<
    BillingAddressFormComponent
  > = null;

  CHECKOUT_CONST = CHECKOUT_CONST;
  viewModel = {
    isNewAddress: true,
    address: null,
    selectedAddressProfile: null,
    showAddressSummary: false,
    isSaveForFuture: false,
    addressData: [
      {
        optionGroup: [],
      },
    ],
  };
  constructor(
    private fb: FormBuilder,
    public _cultureService: CultureService,
    private _checkoutService: CheckoutService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    // this.billingAddressForm.valueChanges.subscribe((data) => {
    //   this.submitBillingAddressForm();
    // });
    this.populateAddressList();
    this.viewModel.address = this.viewModel.addressData[0].optionGroup[0];
    // Billing info payment change subscription
    this.selectedCardProfile.subscribe((profile) => {
      if (profile && profile.billingAddress) {
        this.onBillingAddressChange({ detail: profile?.billingAddress?.id });
      }
      if (profile && profile.id === 'NEW') {
        this.onBillingAddressChange({ detail: profile?.id });
      }
    });
  }

  ngOnChanges() {
    // this.createSelectAddressDropdownList();
    this.updateSubmittedData(this.submittedBillingAddressFormData);
  }

  ngAfterViewInit(): void {
    this.onBillingAddressChange({ detail: this.viewModel.address?.value });
    /**
     * On Change of Select Address From Profile dropdown
     */
    //   this.billingAddressForm
    //     .get('selectAddress')
    //     .valueChanges.subscribe((value) => {
    //       if (value === CHECKOUT_CONST.DROPDOWN_OPTION_NEW) {
    //         Object.keys(this.billingAddressForm.controls).forEach((key) => {
    //           if (this.billingAddressForm.controls[key]['controls']) {
    //             Object.keys(
    //               this.billingAddressForm.controls[key]['controls']
    //             ).forEach((nestedKey) => {
    //               this.billingAddressForm.controls[key]['controls'][
    //                 nestedKey
    //               ].setValue(null);
    //             });
    //           } else {
    //             this.billingAddressForm.controls[key].setValue(null);
    //           }
    //           this.billingAddressForm.controls[key].markAsUntouched();
    //         });
    //       } else if (value) {
    //         this.onAvailableSavedAddressChange(value);
    //       }
    //     });
    //   this.submitBillingAddressForm();
  }

  /**
   * Billing Address dropdown Change event
   * @param {*} data
   * @memberof BillingAddressComponent
   */
  onBillingAddressChange(data) {
    this.viewModel.showAddressSummary = false;
    this.viewModel.address = this.viewModel.addressData[0].optionGroup.find(
      (res) => {
        return res.value === data?.detail;
      }
    );
    if (data?.detail !== CHECKOUT_CONST.DROPDOWN_OPTION_NEW) {
      // Saved Address state
      this.viewModel.isNewAddress = false;
      this.viewModel.showAddressSummary = true;
      this.viewModel.selectedAddressProfile = this.savedBillingAddressData.find(
        (res: any) => {
          return res.id === data.detail;
        }
      );
      this.loadAddressSummaryComponent();
    } else {
      // New Address state
      this.viewModel.selectedAddressProfile = {
        id: CHECKOUT_CONST.DROPDOWN_OPTION_NEW,
      };
      this.viewModel.isNewAddress = true;
      this.loadAddressForm();
    }
  }

  /**
   * Save card checkbox change event
   * @param {*} event
   * @memberof BillingAddressComponent
   */
  onSaveForFutureChange(event) {
    this.viewModel.isSaveForFuture = event?.detail?.checked;
  }

  loadAddressForm() {
    this.clearDynamicComponent();
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      BillingAddressFormComponent
    );
    this.addressFormComponent = this.loadComponent.createComponent(
      componentFactory
    );
    this.addressFormComponent.instance.submittedBillingAddressFormData = this.submittedBillingAddressFormData;
    this.addressFormComponent.instance.onSubmitFormData.subscribe(
      (updatedData: any) => {
        this.submitBillingAddressForm(updatedData);
      }
    );
    this.addressFormComponent.changeDetectorRef.detectChanges();
  }

  loadAddressSummaryComponent() {
    this.clearDynamicComponent();
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      BillingAddressSummaryComponent
    );
    this.addressSummaryComponent = this.loadComponent.createComponent(
      componentFactory
    );
    this.addressSummaryComponent.instance.selectedAddressProfile = this.viewModel.selectedAddressProfile;
    this.addressSummaryComponent.instance.submittedBillingAddressFormData = this.submittedBillingAddressFormData;
    this.addressSummaryComponent.instance.onSaveBillingAddress.subscribe(
      (updatedData: any) => {
        this.saveBillingAddress(updatedData);
      }
    );
    this.addressSummaryComponent.instance.onSubmitSummaryData.subscribe(
      (updatedData: any) => {
        this.submitBillingAddressForm(updatedData);
      }
    );
    this.addressSummaryComponent.changeDetectorRef.detectChanges();
  }

  updateSubmittedData(billingAddressFormData: any): void {
    // TODO need to update when edit saved address
  }

  // TODO edit
  // onAvailableSavedAddressChange(value: any) {
  //   const data = this.savedBillingAddressData.find((res: any) => {
  //     return res.id === value;
  //   });
  //   this.setFormValues(data);
  // }

  /**
   * Select address from profile - Dropdown options creation
   */
  populateAddressList() {
    this.viewModel.addressData[0].optionGroup = [
      {
        label: this._cultureService.orxeTranslate(
          'review-and-pay-screen.saved_address_options.new'
        ),
        value: CHECKOUT_CONST.DROPDOWN_OPTION_NEW,
      },
    ];
    this.savedBillingAddressData.forEach((element: any) => {
      this.viewModel.addressData[0].optionGroup.push({
        label: `${element.profileName} - ${element.type}`,
        value: element.id,
      });
    });
  }

  /**
   * Trigger address state to review page container on data update.
   * @param {*} event
   * @memberof BillingAddressComponent
   */
  submitBillingAddressForm(event: any) {
    // While emitting data, added selectedAddressProfile to maintain id indicating NEW | existing [id]]
    event.data = {
      ...this.viewModel.selectedAddressProfile,
      ...event?.data,
      isSaveForFuture: this.viewModel.isSaveForFuture,
      selectAddressValue: this.viewModel.address?.value,
    };
    this.onSubmitFormData.emit(event);
    if (event && event.valid) {
      this.viewModel.selectedAddressProfile = {
        ...this.viewModel.selectedAddressProfile,
        ...event.data,
      };
    }
  }

  /**
   * Triggered in case of saved address from overlay
   * @param {*} event
   * @memberof BillingAddressComponent
   */
  saveBillingAddress(event: any) {
    event.data = {
      ...this.viewModel.selectedAddressProfile,
      ...event?.data,
      isSaveForFuture: this.viewModel.isSaveForFuture,
      selectAddressValue: this.viewModel.address?.value,
    };
    if (event && event.valid) {
      this.viewModel.selectedAddressProfile = {
        ...this.viewModel.selectedAddressProfile,
        ...event.data,
      };
      this.loadAddressSummaryComponent();
      this.onSaveBillingAddress.emit(event);
    }
  }

  clearDynamicComponent() {
    if (this.loadComponent) {
      this.loadComponent.clear();
    }
  }

  ngOnDestroy() {
    if (this.addressSummaryComponent) {
      this.addressSummaryComponent.changeDetectorRef.detach();
      this.addressSummaryComponent.destroy();
    }
    if (this.addressFormComponent) {
      this.addressFormComponent.changeDetectorRef.detach();
      this.addressFormComponent.destroy();
    }
    this.clearDynamicComponent();
  }
}
