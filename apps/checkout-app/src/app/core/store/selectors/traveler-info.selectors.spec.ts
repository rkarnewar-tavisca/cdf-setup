import { selectTravelerInfo,selectTravelerDetails } from './traveler-info.selectors';
import { initialTravelerInfoState } from '../state/traveler-info.state';

const userSessionResponse = require('../../../../assets/mock/user-session-response.json');
const userProfileResponse = require('../../../../assets/mock/user-profile-response.json');
const userDetails = { name: 'user', email: 'user@gmail.com', phone: '1231231230' };

const initialtravelerState = {
    contactFormData: null,
    travelerInfoFormData: null
};

describe('selectUser-selector', () => {
    test('should return traveler Info state', () => {
        expect(selectTravelerInfo.projector(initialtravelerState)).toEqual(
            initialTravelerInfoState
        );
    });
    test('should return traveler detail state', () => {
        expect(selectTravelerDetails.projector(initialtravelerState)).toEqual(
            null
        );
    });
});
