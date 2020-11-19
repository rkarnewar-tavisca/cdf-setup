import { travelerInfoReducers } from './traveler-info.reducers';
import { initialTravelerInfoState } from '../state/traveler-info.state';
import {
    UpdateTravelerContactDetail,
    UpdateTravelerDetail
} from '../actions/traveler-info.actions';

describe('Traveler Info Reducer', () => {

    test('should set and return default state if unknown action is passed', () => {
        const action = { type: 'NOOP' } as any;
        const reducerResponse = travelerInfoReducers(undefined, action);
        expect(reducerResponse).toEqual(initialTravelerInfoState);
    });

    test('should set and return current user info if GetUserSuccess action is passed', () => {
        const reducerResponse = travelerInfoReducers(
            undefined,
            new UpdateTravelerContactDetail({})
        );
        expect(reducerResponse).toEqual({
            contactFormData: {},
            travelerInfoFormData : null
        });
    });

    test('should set and return current user info if GetUserSuccess action is passed', () => {
        const reducerResponse = travelerInfoReducers(
            undefined,
            new UpdateTravelerDetail({})
        );
        expect(reducerResponse).toEqual({
            travelerInfoFormData: {},
            contactFormData:null
        });
    });

});
