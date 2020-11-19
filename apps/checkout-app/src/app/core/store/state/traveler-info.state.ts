/**
 * Traveler Info state contract defination
 *
 * @export
 * @interface ITravelerInfoState
 */
export interface ITravelerInfoState {
    contactFormData: any;
    travelerInfoFormData: any;
}

/**
 * Initial Traveller Info state defination.
 *
 * @export
 */
export const initialTravelerInfoState: ITravelerInfoState = {
    contactFormData: null,
    travelerInfoFormData : null
};
