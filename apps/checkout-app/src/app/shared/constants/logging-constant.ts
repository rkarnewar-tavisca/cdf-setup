import { environment } from '@env/environment';

export const LOGGING_CONSTANTS = {
  SOURCE: 'Checkout_Microapp',
  APP_NAME: environment.nameSpace,
  BIN: {
    API: 's3_PurchaseBinValidation',
    VERB: 'PurchaseBinValidation',
    METHOD_NAME: 'PurchaseBinValidation'
  },
  TOKENIZATION: {
    API: 'S3_CardTokenization',
    VERB: 'creditcardtoken',
    METHOD_NAME: 'creditcardtoken',
  },
};
