import { CartActions, ECartActions } from '../actions/cart.actions';
import { initialCartState, ICartState } from './../state/cart.state';

export const cartReducers = (
  state = initialCartState,
  action: CartActions
): ICartState => {
  switch (action.type) {
    case ECartActions.GetCartDetail: {
      return {
        ...state,
        loading: true,
        cartInfo: {
          ...state.cartInfo,
          cartDetails: null,
        },
      };
    }
    case ECartActions.GetPriceCartDetail: {
      return {
        ...state,
        loading: true,
        cartInfo: {
          ...state.cartInfo,
          cartDetails: null,
        },
      };
    }
    case ECartActions.GetCartDetailSuccess: {
      return {
        ...state,
        loading: false,
        cartInfo: {
          ...state.cartInfo,
          cartDetails: action.payload,
        },
      };
    }
    case ECartActions.GetCartDetailFailure: {
      return {
        ...state,
        loading: false,
        cartInfo: {
          ...state.cartInfo,
          cartDetails: action.payload,
        },
      };
    }
    case ECartActions.UpdateCLPEnabledFlow: {
      return {
        ...state,
        cartInfo: {
          ...state.cartInfo,
          clpEnabled: action.payload,
        },
      };
    }
    case ECartActions.UpdateCartDetail: {
      return {
        ...state,
        loading: false,
        cartInfo: {
          ...state.cartInfo,
          cartDetails: action.payload,
        },
      };
    }
    case ECartActions.UpdatePaymentOption: {
      return {
        ...state,
        cartInfo: {
          ...state.cartInfo,
          paymentOption: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
