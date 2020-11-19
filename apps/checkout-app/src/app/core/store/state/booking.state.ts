import { ICart } from '@core/interfaces/index';

export interface IBookingState {
  bookingStatus: any;
  loading: boolean;
}

export interface IOrderInitState {
  orderIds: any;
  loading: boolean;
}

export const initialBookingState: IBookingState = {
  bookingStatus: null,
  loading: true,
};

export const orderInitiateState: IOrderInitState = {
  orderIds: null,
  loading: true,
};
