import { Action } from '@ngrx/store';

/**
 * All TravelerInfo related Actions
 *
 * @export
 * @enum {number}
 */
export enum ETravelerInfoActions {
    GetTravelerDetail = '[Traveler Info] Get Cart Detail',
    UpdateTravelerContactDetail = '[Traveler Info] Update Traveler Contact Details',
    GetTravelerContactDetail = '[Traveler Info] Get Traveler Contact Details',
    UpdateTravelerDetail = '[Traveler Info] Update Traveler Details',
    UpdateProductParticipant = '[Traveler Info] Update Product Participant'
}


/**
 * Action to get all traveler form informations
 *
 * @export
 * @class GetTravelerDetail
 * @implements {Action}
 */
export class GetTravelerDetail implements Action {
    public readonly type = ETravelerInfoActions.GetTravelerDetail;
}

/**
 * Action to update current traveler contact details
 *
 * @export
 * @class UpdateTravelerContactDetail
 * @implements {Action}
 */
export class UpdateTravelerContactDetail implements Action {
    public readonly type = ETravelerInfoActions.UpdateTravelerContactDetail;
    constructor(public payload: any) { }
}

/**
 * Action to get contact details from state
 *
 * @export
 * @class GetTravelerContactDetail
 * @implements {Action}
 */
export class GetTravelerContactDetail implements Action {
    public readonly type = ETravelerInfoActions.GetTravelerContactDetail;
    constructor(public payload: any) { }
}

/**
 * Action to update current traveler forms details
 *
 * @export
 * @class UpdateTravelerDetail
 * @implements {Action}
 */
export class UpdateTravelerDetail implements Action {
    public readonly type = ETravelerInfoActions.UpdateTravelerDetail;
    constructor(public payload: any) { }
}

export class UpdateProductParticipant implements Action {
  public readonly type = ETravelerInfoActions.UpdateProductParticipant;
  constructor(public payload: any) { }
}

export type TravelerInfoActions =
    | GetTravelerDetail
    | UpdateTravelerContactDetail
    | GetTravelerContactDetail
    | UpdateTravelerDetail
    | UpdateProductParticipant;

