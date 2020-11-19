import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IBookingState, IOrderInitState } from '../state/booking.state';

const BookState = (state: IAppState) => state.BookingStatus;
const Orderids = (state: IAppState) => state.orderInit;
/**
 * Selector functions help query the state easily. Multiple selectors can be combined to pick a desired state
 */

export const BookingStatus = createSelector(
  BookState,
  (state: IBookingState) => state
);

export const orderInit = createSelector(Orderids, (state: IOrderInitState) => state);
