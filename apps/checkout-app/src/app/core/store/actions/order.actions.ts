import { Action } from '@ngrx/store';

/**
 * All cart related Actions
 */
export enum EOrderAction {
  GetOrder = '[Cart] get Order status',
  OrderSuccess = '[Cart]Order success',
  OrderFailure = '[Cart]Order failure',
}

/**
 * This action will be used to intiate API call and show skeleton loading on the given page
 */
export class GetCartOrder implements Action {
  public readonly type = EOrderAction.GetOrder;
  constructor(public payload: any) {}
}

export class OrderSuccess implements Action {
  public readonly type = EOrderAction.OrderSuccess;
  constructor(public payload: any) {}
}

export class OrderFailure implements Action {
  public readonly type = EOrderAction.OrderFailure;
  constructor(public payload: any) {}
}

export type OrderActions =
  | GetCartOrder
  | OrderSuccess
  | OrderFailure;
