export interface ICart {
  clpEnabled: string;
  cartDetails: any;
  products: any;
  paymentOption: paymentOption;
}

export interface paymentOption {
  redeemed: string,
  isAccordionOpen: boolean
}