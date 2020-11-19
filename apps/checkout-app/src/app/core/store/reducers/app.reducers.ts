import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { userReducers } from './user.reducers';
import { cartReducers } from './cart.reducers';
import { bookingReducers, initialOrderReducers } from './Booking.reducers';
import { travelerInfoReducers } from './traveler-info.reducers';
import { OrderReducers } from './order.reducers';
import { reviewAndPayReducers } from './review-and-pay.reducers';

/**
 * App reducers combines multiple reducers with a key
 */
export const appReducers: ActionReducerMap<IAppState, any> = {
  user: userReducers,
  cart: cartReducers,
  BookingStatus: bookingReducers,
  travelerInfo: travelerInfoReducers,
  order: OrderReducers,
  orderInit: initialOrderReducers,
  reviewAndPay: reviewAndPayReducers
};
