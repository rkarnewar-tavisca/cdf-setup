import { Action } from '@ngrx/store';

/**
 * All cart related Actions
 */
export enum ECartActions {
  GetPriceCartDetail = '[Cart] Get Price Cart Detail',
  GetCartDetail = '[Cart] Get Cart Detail',
  GetCartDetailSuccess = '[Cart] Get Cart Detail Success',
  GetCartDetailFailure = '[Cart] Get Cart Detail Failure',
  UpdateCLPEnabledFlow = '[Cart] Update CLP Enabled Flow',
  UpdateCartDetail = '[Cart] Update Cart Detail',
  UpdatePaymentOption = '[Cart] Update Payment Option',
}

/**
 * This action will be used to intiate API call and show skeleton loading on the given page
 */
export class GetCartDetail implements Action {
  public readonly type = ECartActions.GetCartDetail;
}
export class GetPriceCartDetail implements Action {
  public readonly type = ECartActions.GetPriceCartDetail;
  constructor() { }
}
export class GetCartDetailSuccess implements Action {
  public readonly type = ECartActions.GetCartDetailSuccess;
  constructor(public payload: any) { }
}

export class GetCartDetailFailure implements Action {
  public readonly type = ECartActions.GetCartDetailFailure;
  constructor(public payload: any) { }
}
export class UpdateCartDetail implements Action {
  public readonly type = ECartActions.UpdateCartDetail;
  constructor(public payload: any) { }
}

/**
 * Update user type based on query parameter received for testing purpose
 */
export class UpdateCLPEnabledFlow implements Action {
  public readonly type = ECartActions.UpdateCLPEnabledFlow;
  constructor(public payload: string) { }
}

export class UpdatePaymentOption implements Action {
  public readonly type = ECartActions.UpdatePaymentOption;
  constructor(public payload: any) { }
}

export type CartActions =
  | GetCartDetail
  | GetCartDetailSuccess
  | GetCartDetailFailure
  | UpdateCLPEnabledFlow
  | UpdateCartDetail
  | GetPriceCartDetail
  | UpdatePaymentOption
