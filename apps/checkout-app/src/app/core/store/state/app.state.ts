import { initialUserState, IUserState } from './user.state';
import { initialCartState, ICartState } from './cart.state';
import {
  IBookingState,
  initialBookingState,
  IOrderInitState,
  orderInitiateState,
} from './booking.state';
import {
  initialTravelerInfoState,
  ITravelerInfoState,
} from './traveler-info.state';
import { IOrderState, initialOrderState } from './get-order.state';
import {
  IReviewAndPayState,
  initialReviewAndPayState,
} from './review-and-pay.state';
/**
 * AppState is colleciton of all the states, acts like a database and each reducer is like a table
 */
export interface IAppState {
  user: IUserState;
  cart: ICartState;
  BookingStatus: IBookingState;
  travelerInfo: ITravelerInfoState;
  order: IOrderState;
  orderInit: IOrderInitState;
  reviewAndPay: IReviewAndPayState;

}

/**
 * Initial state of the application, can combine all available default states
 */
export const initialAppState: IAppState = {
  user: initialUserState,
  cart: initialCartState,
  BookingStatus: initialBookingState,
  travelerInfo: initialTravelerInfoState,
  order: initialOrderState,
  orderInit: orderInitiateState,
  reviewAndPay: initialReviewAndPayState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
