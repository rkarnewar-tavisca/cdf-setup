import { Action } from '@ngrx/store';

/**
 * All ReviewAndPay related Actions
 *
 * @export
 * @enum {number}
 */
export enum EReviewAndPayActions {
  UpdateBillingInfoDetail = '[Review and Pay] Update Billing Info Details',
  GetBillingInfoDetail = '[Review and Pay] Get Billing Info Details',
  UpdateBillingAddressDetail = '[Review and Pay] Update Billing Address Details',
  GetBillingAddressDetail = '[Review and Pay] Get Billing Address Details',
  ValidateBin = '[Cart]Booking Validate Bin',
  ValidateBinSuccess = '[Cart]Booking Validate Bin Success',
  ValidateBinFailure = '[Cart]Booking Validate Bin Failure',
}

export class UpdateBillingInfoDetail implements Action {
  public readonly type = EReviewAndPayActions.UpdateBillingInfoDetail;
  constructor(public payload: any) {}
}

export class GetBillingInfoDetail implements Action {
  public readonly type = EReviewAndPayActions.GetBillingInfoDetail;
  constructor(public payload: any) {}
}

export class UpdateBillingAddressDetail implements Action {
  public readonly type = EReviewAndPayActions.UpdateBillingAddressDetail;
  constructor(public payload: any) {}
}

export class GetBillingAddressDetail implements Action {
  public readonly type = EReviewAndPayActions.GetBillingAddressDetail;
  constructor(public payload: any) {}
}

export class ValidateBin implements Action {
  public readonly type = EReviewAndPayActions.ValidateBin;
  constructor(public payload: any) {}
}

export class ValidateBinSuccess implements Action {
  public readonly type = EReviewAndPayActions.ValidateBinSuccess;
  constructor(public payload: any) {}
}
export class ValidateBinFailure implements Action {
  public readonly type = EReviewAndPayActions.ValidateBinFailure;
  constructor(public payload: any) {}
}

export type ReviewAndPayActions =
  | UpdateBillingInfoDetail
  | GetBillingInfoDetail
  | UpdateBillingAddressDetail
  | GetBillingAddressDetail
  | ValidateBin
  | ValidateBinSuccess
  | ValidateBinFailure;
