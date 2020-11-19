import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { ITravelerInfoState } from '../state/traveler-info.state';

export const travelerInfoState = (state: IAppState) => state.travelerInfo;

/**
 * Selector functions help query the state easily. 
 * Multiple selectors can be combined to pick a desired state
 */
export const selectTravelerInfo = createSelector(
    travelerInfoState,
    (state: ITravelerInfoState) => state
);


/**
 * Selector functions help query the state easily. 
 * Multiple selectors can be combined to pick a desired state
 */
export const selectTravelerDetails = createSelector(
    travelerInfoState,
    (state: ITravelerInfoState) => state.travelerInfoFormData
);
