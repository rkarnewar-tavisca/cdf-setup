import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IAppState } from '../state/app.state';
import {
    GetTravelerDetail,
    UpdateTravelerContactDetail,
    ETravelerInfoActions,
    GetTravelerContactDetail,
    UpdateTravelerDetail
} from './traveler-info.actions';

describe('Traveler-Info Actions', () => {
    let mockStore: MockStore<IAppState>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState: {},
                }),
            ],
        });

        mockStore = TestBed.inject(MockStore);
    });

    test('should dispatch GetTravelerDetail action', () => {
        const expectedAction = new GetTravelerDetail();
        mockStore.dispatch = jest.fn();
        mockStore.dispatch(expectedAction);
        expect(expectedAction.type).toEqual(ETravelerInfoActions.GetTravelerDetail);
        expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });


    test('should dispatch UpdateTravelerContactDetail action', () => {
        const payload = {};
        const expectedAction = new UpdateTravelerContactDetail(payload);
        mockStore.dispatch = jest.fn();
        mockStore.dispatch(expectedAction);

        expect(expectedAction.type).toEqual(ETravelerInfoActions.UpdateTravelerContactDetail);
        expect(expectedAction.payload).toEqual(payload);
        expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    test('should dispatch GetTravelerContactDetail action', () => {
        const payload = {};
        const expectedAction = new GetTravelerContactDetail(payload);
        mockStore.dispatch = jest.fn();
        mockStore.dispatch(expectedAction);
        expect(expectedAction.type).toEqual(ETravelerInfoActions.GetTravelerContactDetail);
        expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    test('should dispatch UpdateTravelerDetail action', () => {
        const payload = {};
        const expectedAction = new UpdateTravelerDetail(payload);
        mockStore.dispatch = jest.fn();
        mockStore.dispatch(expectedAction);

        expect(expectedAction.type).toEqual(ETravelerInfoActions.UpdateTravelerDetail);
        expect(expectedAction.payload).toEqual(payload);
        expect(mockStore.dispatch).toHaveBeenCalledWith(expectedAction);
    });

});
