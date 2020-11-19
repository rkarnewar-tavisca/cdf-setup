import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IOrderState } from '../state/get-order.state';

const OrderState = (state: IAppState) => state.order;

/**
 * Selector functions help query the state easily. Multiple selectors can be combined to pick a desired state
 */

export const GetOrder = createSelector(
    OrderState,
  (state: IOrderState) => state
);
