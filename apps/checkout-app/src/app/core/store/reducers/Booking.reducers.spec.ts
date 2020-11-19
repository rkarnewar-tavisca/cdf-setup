import { bookingReducers, initialOrderReducers } from './Booking.reducers';
import { initialBookingState } from '../state/booking.state';
import {
  GetBookingStatus,
  BookingStatusSuccess,
  BookingInitiateSuccess,
  BookingInitiateFailure, BookingInitialize, BookingStatusFailure
} from '../actions/booking.actions';

describe('BookingStatus', () => {
  const mockData = require('src/assets/mock/get-order-status.response.json');
  const bookinitMockData = require('src/assets/mock/get-order-status.response.json');
  const bookinitFailMockData = require('../../../../assets/mock/failure-screen/booking-status-failure-response.json');
  test('should set and return default state if unknown action is passed', () => {
    const action = { type: 'NOOP' } as any;
    const reducerResponse = bookingReducers(undefined, action);
    expect(reducerResponse).toEqual(initialBookingState);
  });
  test('should set and return cart details if BookingStatusSuccess action is passed', () => {
    const reducerResponse = bookingReducers(
      undefined,
      new BookingStatusSuccess(mockData)
    );
    expect(reducerResponse).toEqual({
      bookingStatus: mockData,
      loading: false,
    });
  });
  test('should set and return order Id if BookingInitiateSuccess action is passed', () => {
    const reducerResponse = initialOrderReducers(
      undefined,
      new BookingInitiateSuccess(bookinitMockData)
    );
    expect(reducerResponse).toEqual({
      orderIds: bookinitMockData,
      loading: false,
    });
  });
  test('should return error if booking initiate action is passed', () => {
    const reducerResponse = initialOrderReducers(
      undefined,
      new BookingInitiateFailure(bookinitFailMockData)
    );
    expect(reducerResponse).toEqual({
      orderIds: bookinitFailMockData,
      loading: false,
    });
  });
  test('should set and return BookingStatus if GetBookingStatus action is passed', () => {
    const reducerResponse = bookingReducers(
      undefined,
      new GetBookingStatus(mockData)
    );
    expect(reducerResponse).toEqual({
      bookingStatus: mockData,
      loading: true,
    });
  });
  test('should initialized order', () => {
    const reducerResponse = bookingReducers(
      undefined,
      new BookingInitialize(mockData)
    );
    expect(reducerResponse).toEqual({
      bookingStatus: mockData,
      loading: true,
    });
  });
  test('should return booking failure if BookingStatusFailure action is passed ', () => {
    const reducerResponse = bookingReducers(
      undefined,
      new BookingStatusFailure(mockData)
    );
    expect(reducerResponse).toEqual({
      bookingStatus: mockData,
      loading: false,
    });
  });
  test('should initiate booking', () => {
    const reducerResponse = initialOrderReducers(
      undefined,
      new BookingInitialize(bookinitMockData)
    );
    expect(reducerResponse).toEqual({
      orderIds: bookinitMockData,
      loading: true,
    });
  });
});
