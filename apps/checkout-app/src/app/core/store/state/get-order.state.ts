export interface IOrderState {
    order: any;
    loading: boolean;
  }
  export const initialOrderState: IOrderState = {
    order: null,
    loading: true,
  };