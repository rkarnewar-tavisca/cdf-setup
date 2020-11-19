import { GetOrder } from './get-order.selectors';
const initialState = {
  trackingId: '123',
};
const initialOrderState = {
  bookingStatus: {
    orderId: '123',
    trackingId: '123',
    status: 'InProgress',
    items: [],
    errors: [],
    warnings: [],
  },
};

describe('selector', () => {
  test('should return undefined when bookingStatus is not set', () => {
    const newState = { ...initialOrderState };
    newState.bookingStatus = undefined;
    expect(GetOrder.projector(newState.bookingStatus)).toEqual(undefined);
  });
});
describe('orderSelector', () => {
  test('should return order', () => {
    expect(GetOrder.projector(initialOrderState)).toEqual(initialOrderState);
  });
});
