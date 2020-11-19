// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --qa` replaces `environment.ts` with `environment.qa.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: 'https://public-checkout-bff.qa.cnxloyalty.com',
  cultureBaseUrl: 'https://cdn-translation.qa.cnxloyalty.com/api/v1.0',
  mock: false,
  shellBaseUrl: 'https://orxe-api.qa.cnxloyalty.com/',
  pciBaseUrl:
    'https://checkout-creditcard-component.s3.amazonaws.com/index.html',
  loggingBaseUrl: 'https://orxe-api.qa.cnxloyalty.com/api/orxe/v1.0/log/',
  nameSpace: 'checkout_orxe3',
  applicationId: '53hly6nbtxl',
  owner: '1116',
  binUrl:
    'https://cdhbcs3pv2.execute-api.us-east-1.amazonaws.com/Dev/mock/PurchaseBinValidation/',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in qa mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
