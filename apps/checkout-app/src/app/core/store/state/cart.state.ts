import { ICart } from '@core/interfaces/index';

export interface ICartState {
  cartInfo: ICart;
  loading: boolean;
}

export const initialCartState: ICartState = {
  cartInfo: null,
  loading: true
};
