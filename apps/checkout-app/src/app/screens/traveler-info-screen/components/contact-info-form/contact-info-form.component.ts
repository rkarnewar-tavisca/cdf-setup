import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  Renderer2,
  ViewChild,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Validation } from '@orxe-angular/forms';
import { CheckoutService } from '@shared/services/checkout.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { OverlayService } from '@shared/services/overlay.service';
import { ContactInfoEditOverlayComponent } from '@shared/components/overlays/contact-info-edit-overlay/contact-info-edit-overlay.component';

@Component({
  selector: 'contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrls: ['./contact-info-form.component.scss'],
})
export class ContactInfoFormComponent
  implements AfterViewInit, OnInit, OnDestroy {
  @Input() profileData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  @Input() formSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  @Input() submittedContactFormData: any;
  @Output() contactFormData: EventEmitter<any> = new EventEmitter<any>();
  @Output() contactFormValid: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );
  selectedProfile: Subject<string> = new BehaviorSubject(null);

  @ViewChild('reTypeEmailInputRef', { static: false })
  reTypeEmailInputRef: ElementRef;

  profilesArray = [];
  subscription = new Subscription();

  viewModel = {
    selectedProfile: null,
    editContactInfoFlag: false,
  };

  profilesData = [
    {
      optionGroup: [
        {
          label: CHECKOUT_CONST.NEW_TRAVELERPROFILE_OBJ.label,
          value: CHECKOUT_CONST.DROPDOWN_OPTION_NEW,
        },
      ],
    },
  ];

  contactForm = this.fb.group(
    {
      profiles: CHECKOUT_CONST.DROPDOWN_OPTION_NEW,
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
          ),
        ],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      secondaryPhone: [null, [Validators.pattern('^[0-9]{10,15}$')]],
      verifyEmail: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
          ),
        ],
      ],
    },
    {
      validators: this.checkEmails('email', 'verifyEmail'),
    }
  );
  setInvalidPhone: boolean;
  setInvalidSecondaryPhone: boolean;
  setInvalidEmail: boolean;
  setInvalidVerifyEmail: boolean;

  constructor(
    private fb: FormBuilder,
    private _renderer: Renderer2,
    private _checkoutService: CheckoutService,
    private readonly _viewContainerRef: ViewContainerRef,
    private _overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.contactForm.valueChanges.subscribe((data) => {
      this.updateFormValidationStatus(this.contactForm.status);
    });
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.profileData.subscribe((data) => {
        this.updateProfilesArray(data);
      })
    );
    this.subscription.add(
      this.formSubmitted.subscribe((formSubmitted) => {
        if (formSubmitted) {
          this.submitContactForm(this.contactForm.status);
        }
      })
    );
    this.updateSubmittedData(this.submittedContactFormData);
  }

  /**
   *
   *
   * @param {*} profiles
   * @memberof ContactInfoFormComponent
   */
  updateProfilesArray(profiles): void {
    this.profilesArray = profiles;
    if (this.profilesArray?.length > 0) {
      this.profilesData = [
        {
          optionGroup: [
            {
              label: CHECKOUT_CONST.NEW_TRAVELERPROFILE_OBJ.label,
              value: CHECKOUT_CONST.DROPDOWN_OPTION_NEW,
            },
          ],
        },
      ];

      this.profilesArray.map((profile) => {
        this.profilesData[0].optionGroup.push({
          label: `${profile.name.last} ${profile.name.first}`,
          value: profile.id,
        });
      });
    }
  }

  /**
   * Callback method for onChange event handler of orxe-dropdown
   *
   * @param {*} $event
   * @memberof ContactInfoFormComponent
   */
  onProfileChange($event): void {
    const selectedProfile = this.profilesArray.filter((profile) => {
      return profile.id === $event.target.value;
    });
    if (selectedProfile.length > 0) {
      this.viewModel.selectedProfile = selectedProfile[0];
      this.contactForm.controls.email.setValue(selectedProfile[0].email);
      this.contactForm.controls.verifyEmail.setValue(selectedProfile[0].email);
      this.contactForm.controls.phone.setValue(
        selectedProfile[0].phone ? selectedProfile[0].phone.num : null
      );
      this.contactForm.controls.secondaryPhone.setValue(
        selectedProfile[0].secondaryPhone
          ? selectedProfile[0].secondaryPhone.num
          : null
      );
      if (!selectedProfile[0].email || !selectedProfile[0].phone) {
        // phone or email does not exists, show form
        this.viewModel.editContactInfoFlag = false;
      } else {
        // all required fields are there, so show edit info
        this.viewModel.editContactInfoFlag = true;
      }
    } else {
      // New Contact info
      this.viewModel.editContactInfoFlag = false;
      this.viewModel.selectedProfile = null;
      this.resetContactForm();
    }
  }

  /**
   * Reset contact form
   *
   * @memberof ContactInfoFormComponent
   */
  resetContactForm(): void {
    Object.keys(this.contactForm.controls).forEach((key) => {
      if (key !== CHECKOUT_CONST.TRAVELER_PROFILE_DROPDOWN_NAME) {
        this.contactForm.controls[key].setValue(null);
        this.contactForm.controls[key].markAsUntouched();
      }
    });
    this.resetFormValidity();
  }

  /**
   * Reset contact form validity
   *
   * @memberof ContactInfoFormComponent
   */
  resetFormValidity(): void {
    this.setInvalidPhone = false;
    this.setInvalidSecondaryPhone = false;
    this.setInvalidEmail = false;
    this.setInvalidVerifyEmail = false;
  }

  /**
   * Method to submit contact info form data to parent component
   *
   * @memberof ContactInfoFormComponent
   */
  submitContactForm(status): void {
    if (status === 'VALID') {
      let pData = this.contactForm.value;
      const profileName = this._checkoutService.findObjectInArray(
        this.profilesData[0].optionGroup,
        'value',
        pData.profiles
      )?.label;
      pData = { ...pData, profileName };
      this.contactFormData.emit(pData);
    } else {
      Validation.validateAllFormFields(this.contactForm);
      Object.keys(this.contactForm.controls).forEach((field) => {
        this.onBlurValidateInputs(field);
      });
      this.contactFormData.emit(null);
    }
  }

  /**
   * custom validation for retype email.
   *
   * @param {string} controlName
   * @param {string} matchingControlName
   * @returns {object}
   * @memberof ContactInfoFormComponent
   */
  checkEmails(controlName: string, matchingControlName: string): object {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * Method used to set invalid flag of orxe-input to show errors.
   *
   * @param {string} fieldName
   * @returns {boolean}
   * @memberof ContactInfoFormComponent
   */
  errorState(fieldName: string): void {
    if (fieldName === 'verifyEmail') {
      this._renderer.setAttribute(
        this.reTypeEmailInputRef.nativeElement,
        'validation-reg-ex',
        this.contactForm.controls.email.value
      );
      this._renderer.setAttribute(
        this.reTypeEmailInputRef.nativeElement,
        'invalid',
        ''
      );
    }
  }

  /**
   * Method for phone number input restriction
   *
   * @param {*} event
   * @returns
   * @memberof ContactInfoFormComponent
   */
  restrict(event) {
    const allowedKeys = [8, 9, 37, 39];
    if (
      !parseInt(event.key) &&
      event.key !== '0' &&
      !allowedKeys.includes(event.keyCode)
    ) {
      event.preventDefault();
      return false;
    }
  }

  /**
   * method to return string's first letter in capital letters
   *
   * @param {*} string
   * @returns
   * @memberof ContactInfoFormComponent
   */
  capitalizeString(string) {
    return string && string[0].toUpperCase() + string.slice(1);
  }

  /**
   * orxe-input onBlur event handler callback method.
   * Used to show validation errors.
   *
   * @param {string} fieldName
   * @memberof ContactInfoFormComponent
   */
  onBlurValidateInputs(fieldName: string): void {
    const control = this.contactForm.get(fieldName);
    control.markAsTouched({ onlySelf: true });
    if (
      this.contactForm.get(fieldName).touched &&
      this.contactForm.get(fieldName).errors != null
    ) {
      this[`setInvalid${this.capitalizeString(fieldName)}`] = true;
      this.errorState(fieldName);
    } else {
      this[`setInvalid${this.capitalizeString(fieldName)}`] = false;
    }
    this.setEmailValidation();
  }

  /**
   * Method to set retype email validation status
   *
   * @memberof ContactInfoFormComponent
   */
  setEmailValidation() {
    if (
      this.contactForm.controls.email.touched &&
      this.contactForm.controls.verifyEmail.touched
    ) {
      const email = this.contactForm.get('email').value;
      const verifyEmail = this.contactForm.get('verifyEmail').value;
      if (
        verifyEmail &&
        !verifyEmail.match(
          /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
        )
      ) {
        this.setInvalidVerifyEmail = true;
      } else if (email !== verifyEmail) {
        this.setInvalidVerifyEmail = true;
      } else {
        if (email && verifyEmail && email === verifyEmail) {
          this.setInvalidVerifyEmail = false;
        }
      }
    }
  }

  /**
   * Method used to update contact form data from state.
   * In case of user click back button from review & pay page,
   * users previously submitted data should be updated in contact form
   *
   * @param {*} contactFormData
   * @memberof ContactInfoFormComponent
   */
  updateSubmittedData(contactFormData): void {
    this.viewModel.selectedProfile = contactFormData;
    if (contactFormData) {
      this.viewModel.editContactInfoFlag = true;
      this.contactForm.controls.email.setValue(contactFormData.email);
      this.contactForm.controls.phone.setValue(contactFormData.phone);
      this.contactForm.controls.secondaryPhone.setValue(
        contactFormData.secondaryPhone
      );
      this.contactForm.controls.verifyEmail.setValue(
        contactFormData.verifyEmail
      );
      this.contactForm.controls.profiles.setValue(contactFormData.profiles);
      this.selectedProfile.next(contactFormData.profiles);
    }
  }

  /**
   * Method used to give update contact form validation status to traveler-info component.
   * Here contactFormValid output event has been emmited with validation status.
   *
   * @param {*} status
   * @memberof ContactInfoFormComponent
   */
  updateFormValidationStatus(status): void {
    if (status === 'VALID') {
      this.contactFormValid.emit(true);
    } else {
      this.contactFormValid.emit(false);
    }
  }

  /**
   * Method to open edit contact details overlay
   *
   * @memberof ContactInfoFormComponent
   */
  onClickEditBtn() {
    let pData = this.contactForm.value;
    const profileName = this._checkoutService.findObjectInArray(
      this.profilesData[0].optionGroup,
      'value',
      pData.profiles
    )?.label;
    pData = { ...pData, profileName };

    let editContactDetailsOverlay: any = this._overlayService.showOverlay(
      ContactInfoEditOverlayComponent,
      this._viewContainerRef
    );
    editContactDetailsOverlay.contactDetail = pData;
    editContactDetailsOverlay.onSubmitted.subscribe((data) => {
      this.contactForm.controls.email.setValue(data.data.email);
      this.contactForm.controls.verifyEmail.setValue(data.data.verifyEmail);
      this.contactForm.controls.phone.setValue(data.data.phone);
      this.contactForm.controls.secondaryPhone.setValue(
        data.data.secondaryPhone
      );
      this.updateCurrentProfile(data.data);
      editContactDetailsOverlay.contactInfoSaveStatus = {
        status: true,
      };
      editContactDetailsOverlay.ngOnChanges();
    });
  }

  /**
   * Method to update the current profiles contatc info in profilesArr
   *
   * @param {*} editedContactInfoData
   * @memberof ContactInfoFormComponent
   */
  updateCurrentProfile(editedContactInfoData) {
    const foundProfileIndex = this.profilesArray.findIndex(
      (profile) => profile.id === editedContactInfoData.profiles
    );
    if (foundProfileIndex >= 0) {
      let updatedProfileObj = this.profilesArray[foundProfileIndex];
      // TO DO : Once we use date selector eith countrycode then we can change this hardcoded values
      updatedProfileObj = {
        ...updatedProfileObj,
        secondaryPhone: {
          countryCode: null,
          id: 'secondaryPhone',
          num: editedContactInfoData.secondaryPhone,
        },
        email: editedContactInfoData.email,
        phone: { num: editedContactInfoData.phone },
      };
      this.profilesArray = [...this.profilesArray];
      this.profilesArray.splice(foundProfileIndex, 1);
      this.profilesArray.push(updatedProfileObj);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
