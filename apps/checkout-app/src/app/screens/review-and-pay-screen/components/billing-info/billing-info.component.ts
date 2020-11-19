import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CultureService } from '@orxe-culture/angular';
import { CHECKOUT_CONST, LOGGING_CONSTANTS } from '@shared/constants';
import { ComponentResolverService } from '@shared/services/component-resolver.service';
import { ISavedCard } from '../../interface';
import { FrameLoaderComponent } from '../frame-loader/frame-loader.component';
import { CARD_ISSUER_ICONS, CARD_ICON_STYLES } from '../../resources';
import { ICCNumberSettings } from '../frame-loader/interfaces';
import { LoggingService } from '@shared/services/logging.service';
import { TraceLog } from '@orxe-sdk/logging';
import { cardTypes, ResolveCardType, cardIssuedBy } from '../../utils';
import { environment } from '@env/environment';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  CHECKOUT_CONST = CHECKOUT_CONST;
  @Input() savedCardData: ISavedCard[] = [];
  @Input() submittedBillingInfoFormData: any;
  @Input() errors: any;
  @Input() transitCode: string;
  @Output() billingInfoFormData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dateSelector', { static: false }) public dateSelector: ElementRef;
  @ViewChild('CcContainer', { static: true, read: ViewContainerRef })
  CcContainer: ViewContainerRef;
  _ccComponent: FrameLoaderComponent;
  isInvalidExpirationDate: boolean = false;
  savedCardObject: any = [];
  readonlyCCComponent = true;
  pciComponentLoaded = false;
  cvvValidation = {
    minLength: CHECKOUT_CONST.CVV_MIN_LENGTH,
    maxLength: CHECKOUT_CONST.CVV_MAX_LENGTH,
    regex: CHECKOUT_CONST.CVV_REGEX,
  };
  cardData: any[] = [
    {
      optionGroup: [],
    },
  ];
  allowedCards = CHECKOUT_CONST.ALLOWED_CARDS;
  billingInfoForm: FormGroup = this.fb.group({
    // TODO when dropdown placeholder issue is resolved reset it ot null
    savedCard: [CHECKOUT_CONST.DROPDOWN_OPTION_NEW, Validators.required],
    cardHolderName: [
      null,
      [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
    ],
    number: [null, Validators.required],
    cvv: [
      null,
      [
        Validators.required,
        Validators.minLength(this.cvvValidation.minLength),
        Validators.maxLength(this.cvvValidation.maxLength),
      ],
    ],
    expirationDate: [null, [Validators.required]],
    token: [null],
    issuedBy: [null],
    /**
     * invalidCardNumber property set card number invalid in case of new card
     * to restrict user from proceeding checkout
     * until we receive tokenized card number.
     */
    invalidCardNumber: [true],
    binIdentificationNumber: [null],
  });
  setInvalidCc: boolean;
  setInvalidCvv: boolean;
  isNewCard = true;

  constructor(
    private fb: FormBuilder,
    private _cultureService: CultureService,
    private readonly componentResolver: ComponentResolverService,
    private _loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.createSelectCardDropdownList();
    this.initCCComponent();
  }

  ngOnChanges() {
    this.updateSubmittedData(this.submittedBillingInfoFormData);
  }

  ngAfterViewInit(): void {
    this.setDateSelectorAttributes();
  }

  /**
   *
   * On Payment method change event
   * @param {*} event
   * @memberof BillingInfoComponent
   */
  onCardChange(event) {
    this.isInvalidExpirationDate = false;
    if (event.detail === CHECKOUT_CONST.DROPDOWN_OPTION_NEW) {
      this.isNewCard = true;
      this.readonlyCCComponent = false;
      this.resetBillingForm();
      this.savedCardObject = null;
      this.billingInfoForm.get('invalidCardNumber').patchValue(true);
      this.clearCardNumber();
      this.validateCVVLength();
    } else {
      this.isNewCard = false;
      this.onAvailableSavedCardChange(event.detail);
      this.billingInfoForm.get('invalidCardNumber').patchValue(false);
      this.readonlyCCComponent = true;
      this.addCCNumberIssuerImage(event.detail);
      // Clear CC component value when existing card is selected.
      this.clearCardNumber();
      this.validateCVVLength();
    }
    this.submitBillingInfoForm();
  }

  /**
   * Reset Billing Form
   * @memberof BillingInfoComponent
   */
  resetBillingForm(): void {
    Object.keys(this.billingInfoForm.controls).forEach((key) => {
      if (key !== 'savedCard') {
        this.billingInfoForm.controls[key].setValue(null);
        this.billingInfoForm.controls[key].markAsUntouched();
      }
    });
  }

  /**
   * Initialize CC component
   */
  initCCComponent() {
    this._ccComponent = this.componentResolver.resolve(
      FrameLoaderComponent,
      this.CcContainer
    );

    this._ccComponent.onActivation.subscribe((response) => {
      const settings: ICCNumberSettings = {
        label: this._cultureService.orxeTranslate(
          'review-and-pay-screen.billing_info.cc_component_defaults.label'
        ),
        placeholder: this._cultureService.orxeTranslate(
          'review-and-pay-screen.billing_info.cc_component_defaults.placeholder'
        ),
        blankFiledErrorMessage: this._cultureService.orxeTranslate(
          'review-and-pay-screen.billing_info.cc_component_defaults.validations_blank'
        ),
        invalidDataErrorMessage: this._cultureService.orxeTranslate(
          'review-and-pay-screen.billing_info.cc_component_defaults.validations_invalid'
        ),
        transitCode: this.transitCode,
        allowedCards: this.allowedCards,
        forbidCardErrorMessage: this._cultureService.orxeTranslate(
          'review-and-pay-screen.billing_info.cc_component_defaults.validations_forbid_card'
        ),
        extraLabelText: this._cultureService.orxeTranslate(
          'review-and-pay-screen.billing_info.cc_component_defaults.extraLabelText'
        ),
      };
      this._ccComponent.setDefaults(settings);
      if (response && response.type && this.readonlyCCComponent) {
        this.updatePCIComponentFlag();
      }
    });

    this._ccComponent.onTokenize.subscribe((response: any) => {
      // TODO this would be used further after tokenization
      if (response) {
        // Trace log for tokenization response
        this._loggingService.traceLog({
          source: LOGGING_CONSTANTS.SOURCE,
          api: LOGGING_CONSTANTS.TOKENIZATION.API,
          verb: LOGGING_CONSTANTS.TOKENIZATION.VERB,
          methodName: LOGGING_CONSTANTS.TOKENIZATION.METHOD_NAME,
          msg: response.message,
          timeTakenInMs: response.timeTaken,
          category: 'Trace',
          appName: environment.nameSpace,
          additionalInfo: {
            status: response.status,
          },
        });
        // Set actual component invalid value in case of new card
        this.billingInfoForm
          .get('invalidCardNumber')
          .patchValue(response.invalidCardNumber);
        // take first six digit from masked number for bin validation
        this.billingInfoForm
          .get('binIdentificationNumber')
          .patchValue(response.maskedNumber?.substr(0, 6));
        this.billingInfoForm.get('number').patchValue(response.maskedNumber);
        this.billingInfoForm.get('token').patchValue(response.token);
        if (response.cardType) {
          const issuer = Object.keys(cardIssuedBy).find(
            (key) => cardIssuedBy[key] === response.cardType
          );
          this.billingInfoForm.get('issuedBy').patchValue(issuer);
        }
        this.submitBillingInfoForm();
        this.clearCardNumberError();
      }
    });

    this._ccComponent.onKeyup.subscribe((response: any) => {
      // TODO this is for DNA purpose
    });

    this._ccComponent.onBlur.subscribe((response: any) => {
      if (response && response.cardType) {
        this.validateCVVLength(response.cardType);
      }
    });
  }

  /*
   * Update PCI component loaded flag
   */
  updatePCIComponentFlag(): void {
    this.pciComponentLoaded = true;
    const value = this.billingInfoForm.get('savedCard').value;
    if (!value || (value && value !== CHECKOUT_CONST.DROPDOWN_OPTION_NEW)) {
      this.readonlyCCComponent = true;
    } else {
      this.readonlyCCComponent = false;
    }
  }

  /**
   * This methods add card number issuer svg image on readonly input field based on type of issuedBy.
   */
  addCCNumberIssuerImage(value) {
    const selectedCard: ISavedCard = this.savedCardData.find((res) => {
      return res.id === value;
    });
    const svgTemplate = CARD_ISSUER_ICONS[`${selectedCard?.issuedBy}`];
    if (svgTemplate) {
      const inp = document.getElementById('cardNumberInput');
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgTemplate, 'image/svg+xml');
      const svg: any = doc.children[0];
      svg.style.width = CARD_ICON_STYLES.width;
      svg.style.height = CARD_ICON_STYLES.height;
      svg.style.alignSelf = CARD_ICON_STYLES.alignSelf;
      const div = document.createElement('div');
      div.style.display = CARD_ICON_STYLES.display;
      div.id = CARD_ICON_STYLES.id;
      div.style.paddingRight = CARD_ICON_STYLES.paddingRight;
      div.appendChild(svg);
      const shadowRoot = inp.shadowRoot;
      if (shadowRoot) {
        const container = shadowRoot.children[0];
        const oldElem = container?.querySelector(`#${CARD_ICON_STYLES.id}`);
        if (oldElem) {
          container.removeChild(oldElem);
        }
        setTimeout(() => {
          container.appendChild(div);
        });
      }
    }
  }

  onAvailableSavedCardChange(value: any) {
    const data = this.savedCardData.find((res) => {
      return res.id === value;
    });
    this.billingInfoForm.get('cardHolderName').setValue(data.nameOnCard);
    this.billingInfoForm.get('number').setValue(data.num);
    this.billingInfoForm.get('token').setValue(data.token);
    this.billingInfoForm.get('issuedBy').setValue(data.issuedBy);
    this.savedCardObject = data;
    const currentTime = new Date();
    if (
      currentTime.getFullYear() < data.expiry.year ||
      (currentTime.getFullYear() === data.expiry.year &&
        currentTime.getMonth() <= data.expiry.month)
    ) {
      this.billingInfoForm.get('expirationDate').setValue(data.expiry);
    } else {
      this.isInvalidExpirationDate = true;
      this.onBlurDateSelector();
    }
  }

  setDateSelectorAttributes() {
    let maxDate = new Date();
    maxDate.setFullYear(
      maxDate.getFullYear() + CHECKOUT_CONST.EXPIRATION_DATE_MAX_DATE
    );
    if (this.dateSelector) {
      this.dateSelector.nativeElement.setAttribute('min-date', new Date());
      this.dateSelector.nativeElement.setAttribute('max-date', maxDate);
    }
  }

  /**
   * Select Card Detail from Profile - Dropdown options creation
   */
  createSelectCardDropdownList() {
    this.savedCardData.forEach((element: any) => {
      this.cardData[0].optionGroup.push({
        label: `${element.issuedBy} - ${element.num.slice(-4)}`,
        value: element.id,
      });
    });
    this.cardData[0].optionGroup.push({
      label: this._cultureService.orxeTranslate(
        'review-and-pay-screen.saved_card_options.new'
      ),
      value: CHECKOUT_CONST.DROPDOWN_OPTION_NEW,
    });
  }

  errorState(fieldName: string): boolean {
    return (
      this.billingInfoForm.get(fieldName).touched &&
      this.billingInfoForm.get(fieldName).errors != null
    );
  }

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
  checkValidity(fieldName) {
    if (this.billingInfoForm.get(fieldName).valid)
      fieldName === 'number'
        ? (this.setInvalidCc = false)
        : fieldName === 'cvv'
        ? (this.setInvalidCvv = false)
        : null;
  }
  onBlurValidateInputs(fieldName: string) {
    const control = this.billingInfoForm.get(fieldName);
    control.markAsTouched({ onlySelf: true });
    if (
      this.billingInfoForm.get(fieldName).touched &&
      this.billingInfoForm.get(fieldName).errors != null
    ) {
      if (fieldName === 'number') {
        this.setInvalidCc = true;
      } else if (fieldName === 'cvv') {
        this.setInvalidCvv = true;
      } else {
        this.setInvalidCvv = false;
        this.setInvalidCc = false;
      }
    }
    this.submitBillingInfoForm();
  }

  onBlurDateSelector() {
    this.dateSelector.nativeElement.validate();
    this.submitBillingInfoForm();
  }

  submitBillingInfoForm() {
    this.billingInfoFormData.emit({
      formData: this.billingInfoForm,
      savedCardObject: this.savedCardObject,
    });
  }

  /**
   * Clear cc number on new card selection
   */
  clearCardNumber() {
    if (this._ccComponent) {
      this._ccComponent.updateCardDetail({
        cardNumber: '',
      });
    }
    this.billingInfoForm.get('binIdentificationNumber').patchValue(null);
    this.setInvalidCvv = false;
    this.clearCardNumberError();
  }

  // Clear card number error when card number is changed again after validating bin
  clearCardNumberError() {
    if (this.errors && this.errors.info) {
      const cardNumberError = this.errors.info[0].message;
      if (
        cardNumberError ===
        this._cultureService.orxeTranslate(
          'review-and-pay-screen.card_number_api_error'
        )
      ) {
        this.errors.info = null;
      }
    }
  }

  /**
   * Calculate CVV/CID length based on card type
   */

  validateCVVLength(issuer?): void {
    let cardTypeObj = null;
    if (!issuer) {
      // In case of saved card we get issuedBy
      issuer = ResolveCardType.getCardTypeKeyName(
        this.savedCardObject?.issuedBy
      );
    }
    cardTypeObj = cardTypes[issuer];
    this.updateCVVLength(cardTypeObj?.code?.size || null);
  }

  /**
   * Update CVV/CID length and pattern validations
   */

  updateCVVLength(cvvLength) {
    this.setInvalidCvv = false;
    let min = CHECKOUT_CONST.CVV_MIN_LENGTH;
    let max = CHECKOUT_CONST.CVV_MAX_LENGTH;
    let regex = CHECKOUT_CONST.CVV_REGEX;

    if (cvvLength) {
      min = max = cvvLength;
      regex = `^[0-9]{${cvvLength},${cvvLength}}$`;
    }
    this.cvvValidation = {
      minLength: min,
      maxLength: max,
      regex,
    };
    this.billingInfoForm
      .get('cvv')
      .setValidators([
        Validators.required,
        Validators.minLength(min),
        Validators.maxLength(max),
      ]);
    this.billingInfoForm.controls.cvv.updateValueAndValidity();
    if (
      this.billingInfoForm.get('cvv').touched &&
      !this.billingInfoForm.get('cvv').valid
    ) {
      this.setInvalidCvv = true;
    }
  }

  /**
   * Method used to update contact form data from state.
   * In case of user click back button from traveler info page,
   * users previously filled data should be as it is in Billing Info form
   *
   * @param {*} billingInfoFormData
   */
  updateSubmittedData(billingInfoFormData: any): void {
    if (billingInfoFormData) {
      this.billingInfoForm
        .get('cardHolderName')
        .setValue(billingInfoFormData?.data?.cardHolderName);
      this.billingInfoForm
        .get('number')
        .setValue(billingInfoFormData?.data?.number);
      this.billingInfoForm
        .get('expirationDate')
        .setValue({ ...billingInfoFormData?.data?.expirationDate });
      billingInfoFormData.savedCardObject
        ? this.billingInfoForm
            .get('savedCard')
            .setValue(billingInfoFormData?.data?.savedCard)
        : null;
      Object.keys(this.billingInfoForm.controls).forEach((field) => {
        const control = this.billingInfoForm.get(field);
        control.value ? control.markAsTouched({ onlySelf: true }) : null;
      });
    }
  }

  ngOnDestroy() {
    this.CcContainer.clear();
  }
}
