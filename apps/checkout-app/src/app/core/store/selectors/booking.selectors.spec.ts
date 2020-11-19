import { BookingStatus, orderInit } from './booking.selectors';
const initialBookinitState = {
  date: '2018-01-01T00:03:00Z',
  orderId: 123,
  trackingId: '123',
};
const initialBookingState = {
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
    const newState = { ...initialBookingState };
    newState.bookingStatus = undefined;
    expect(BookingStatus.projector(newState.bookingStatus)).toEqual(undefined);
  });
});

describe('BookingSelectors', () => {
  test('should return Booking Status details', () => {
    expect(BookingStatus.projector(initialBookingState)).toEqual(
      initialBookingState
    );
  });
  test('should return object with tracking id ', () => {
    expect(orderInit.projector(initialBookinitState)).toEqual(
      initialBookinitState
    );
  });
});
