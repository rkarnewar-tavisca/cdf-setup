export interface ISavedCard {
  id: string;
  token: string;
  num: string;
  nameOnCard: string;
  issuedBy: string;
  expiry: {
    month: number;
    year: number;
  };
}


export interface IBillingAddress {
  id?: string;
  profileId?: string;
  profileName?: string;
  isSubProfile?: boolean;
  subProfileId?:string;
  type: string;
  line1: string;
  line2: string;
  city: {
    code: string;
    name: string;
  };
  state: {
    code: string;
    name: string;
  };
  countryCode: string;
  postalCode: string;
}
