import { selectUser, selectUserSession, selectUserProfile, userState } from './user.selectors';

const userSessionResponse = require('../../../../assets/mock/user-session-response.json');
const userProfileResponse = require('../../../../assets/mock/user-profile-response.json');
const userDetails = { name: 'user', email: 'user@gmail.com', phone: '1231231230' };

const initialUserState = {
    currentUser: userDetails,
    userSession: userSessionResponse,
    userProfiles: userProfileResponse
};

describe('selectUser-selector', () => {
    test('should return user info', () => {
        expect(selectUser.projector(initialUserState)).toEqual(
            initialUserState.currentUser
        );
    });

    test('should return null when currentUser is not set', () => {
        const newState = { ...initialUserState };
        newState.currentUser = null;
        expect(selectUser.projector(newState)).toEqual(null);
    });
});

describe('selectUserSession-selector', () => {
    test('should return user session details', () => {
        expect(selectUserSession.projector(initialUserState)).toEqual(
            initialUserState.userSession
        );
    });
});

describe('selectUserprofile-selector', () => {
    test('should return user profile details', () => {
        expect(selectUserProfile.projector(initialUserState)).toEqual(
            initialUserState.userProfiles
        );
    });
});
