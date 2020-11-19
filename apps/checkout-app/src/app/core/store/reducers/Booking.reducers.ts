import {
  EBookingAction,
  BookingActions,
  GetBookingStatus,
} from '../actions/booking.actions';
import {
  initialBookingState,
  IBookingState,
  orderInitiateState,
  IOrderInitState,
} from '../state/booking.state';

export const bookingReducers = (
  state = initialBookingState,
  action: BookingActions
): IBookingState => {
  switch (action.type) {
    case EBookingAction.GetBookingStatus: {
      return {
        loading: true,
        bookingStatus: action.payload,
      };
    }
    case EBookingAction.BookingInitialize: {
      return {
        ...state,
        loading: true,
        bookingStatus: action.payload,
      };
    }
    case EBookingAction.BookingStatusSuccess: {
      return {
        ...state,
        loading: false,
        bookingStatus: action.payload,
      };
    }
    case EBookingAction.BookingStatusFailure: {
      return {
        ...state,
        loading: false,
        bookingStatus: action.payload,
      };
    }
    default:
      return state;
  }
};
export const initialOrderReducers = (
  state = orderInitiateState,
  action: BookingActions
): IOrderInitState => {
  switch (action.type) {
    case EBookingAction.BookingInitialize: {
      return {
        loading: true,
        orderIds: action.payload,
      };
    }
    case EBookingAction.BookingInitiateSuccess: {
      return {
        ...state,
        loading: false,
        orderIds: action.payload,
      };
    }
    case EBookingAction.BookingInitiateFailure: {
      return {
        ...state,
        loading: false,
        orderIds: action.payload,
      };
    }
    default:
      return state;
  }
};
