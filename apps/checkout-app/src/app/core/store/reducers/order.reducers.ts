import {
  EOrderAction,
  OrderActions,
  GetCartOrder,
} from '../actions/order.actions';
import { initialOrderState, IOrderState } from './../state/get-order.state';

export const OrderReducers = (
  state = initialOrderState,
  action: OrderActions
): IOrderState => {
  switch (action.type) {
    case EOrderAction.GetOrder: {
      return {
        loading: true,
        order: action.payload,
      };
    }
    case EOrderAction.OrderSuccess: {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    }
    case EOrderAction.OrderFailure: {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    }
    default:
      return state;
  }
};
