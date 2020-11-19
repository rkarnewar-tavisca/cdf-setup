import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ICartState } from '../state/cart.state';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';

const cartState = (state: IAppState) => state.cart;

/**
 * Selector functions help query the state easily. Multiple selectors can be combined to pick a desired state
 */
export const selectClpFlow = createSelector(
  cartState,
  (state: ICartState) => state.cartInfo?.clpEnabled
);
export const selectPaymentOption = createSelector(
  cartState,
  (state: ICartState) => state.cartInfo?.paymentOption
);
export const selectCartDetail = createSelector(
  cartState,
  (state: ICartState) => state
);

export const selectClientProgramFee = createSelector(
  cartState,
  (state: ICartState) => {
    const cartFees = state.cartInfo?.cartDetails?.price?.breakup?.fees;
    if (cartFees) {
      const clientFee = cartFees.filter(fee => fee.type === CHECKOUT_CONST.ORDER_FEE);
      if (clientFee.length > 0) {
        return clientFee[0].amount;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
)
