export interface ICCNumberSettings {
  label: string;
  placeholder?: string;
  hideCardType?: boolean;
  blankFiledErrorMessage?: string;
  invalidDataErrorMessage?: string;
  allowedCards?: string[];
  transitCode: string;
  forbidCardErrorMessage?: string;
  extraLabelText?: string;
}
