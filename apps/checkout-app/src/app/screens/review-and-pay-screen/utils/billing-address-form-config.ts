/**
 * This config file will set billing address form
 */
export const BILLING_ADDRESS_FORM_CONFIG: any = {
  country: [
    {
      value: 'United States',
      fields: ['stateDropdown', 'zipCode'],
      zipCodelabel: 'review-and-pay-screen.billing_address.label.zip_code',
      zipCodeInvalid: 'review-and-pay-screen.billing_address.validations_invalid.zip_code',
      zipCodeBlank: 'review-and-pay-screen.billing_address.validations_blank.zip_code',
      usMilitary: true,
    },
    {
      value: 'CA',
      fields: ['stateDropdown', 'zipCode'],
      zipCodelabel: 'review-and-pay-screen.billing_address.label.postal_code',
      zipCodeInvalid: 'review-and-pay-screen.billing_address.validations_invalid.postal_code',
      zipCodeBlank: 'review-and-pay-screen.billing_address.validations_blank.postal_code',
    },
    {
      value: 'AU',
      fields: ['stateDropdown', 'zipCode'],
      zipCodelabel: 'review-and-pay-screen.billing_address.label.post_code',
      zipCodeInvalid: 'review-and-pay-screen.billing_address.validations_invalid.post_code',
      zipCodeBlank: 'review-and-pay-screen.billing_address.validations_blank.post_code',
    },
  ],
  usMilitary: {
    fields: ['stateDropdown', 'postOffice', 'zipCode'],
    countryCode: 'United States',
    zipCodelabel: 'review-and-pay-screen.billing_address.label.zip_code',
    zipCodeInvalid: 'review-and-pay-screen.billing_address.validations_invalid.zip_code',
    zipCodeBlank: 'review-and-pay-screen.billing_address.validations_blank.zip_code',
  },
  defaultZipCodeLabel: 'review-and-pay-screen.billing_address.label.zip_code',
  defaultZipCodeInvalid: 'review-and-pay-screen.billing_address.validations_invalid.zip_code',
  defaultZipCodeBlank: 'review-and-pay-screen.billing_address.validations_blank.zip_code',
};
