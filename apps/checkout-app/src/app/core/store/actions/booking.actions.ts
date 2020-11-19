import { Action } from '@ngrx/store';

/**
 * All cart related Actions
 */
export enum EBookingAction {
  BookingInitialize = '[Cart] Booking Init',
  GetBookingStatus = '[Cart] get Booking status',
  BookingStatusSuccess = '[Cart]Booking success',
  BookingStatusFailure = '[Cart]Booking failure',
  BookingInitiateSuccess = '[Cart]Booking initiate Success',
  BookingInitiateFailure = '[Cart]Booking initiate Fail',
}

/**
 * This action will be used to intiate API call and show skeleton loading on the given page
 */
export class GetBookingStatus implements Action {
  public readonly type = EBookingAction.GetBookingStatus;
  constructor(public payload: any) {}
}
export class BookingInitialize implements Action {
  public readonly type = EBookingAction.BookingInitialize;
  constructor(public payload: any) {}
}
export class BookingInitiateSuccess implements Action {
  public readonly type = EBookingAction.BookingInitiateSuccess;
  constructor(public payload: any) {}
}
export class BookingInitiateFailure implements Action {
  public readonly type = EBookingAction.BookingInitiateFailure;
  constructor(public payload: any) {}
}

export class BookingStatusSuccess implements Action {
  public readonly type = EBookingAction.BookingStatusSuccess;
  constructor(public payload: any) {}
}

export class BookingStatusFailure implements Action {
  public readonly type = EBookingAction.BookingStatusFailure;
  constructor(public payload: any) {}
}

export type BookingActions =
  | BookingInitialize
  | BookingInitiateSuccess
  | BookingInitiateFailure
  | GetBookingStatus
  | BookingStatusSuccess
  | BookingStatusFailure;
