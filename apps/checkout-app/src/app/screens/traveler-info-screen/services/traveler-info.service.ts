import { Injectable } from '@angular/core';
import { ContactInfoProfileData } from '../interfaces/contact-info';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';

@Injectable({
    providedIn: 'root'
})
export class TravelerInfoService {

    getOFACRequestObject(sessionInfo, travelerInfo) {
        let participantsArr = [];
        for (let i = 0; i < travelerInfo.length; i++) {
            const selectedProfiles = travelerInfo[i].selectedProfiles;
            // Year here is hardcoded as DOB is not there in gift card
            for(let j=0; j < selectedProfiles.length;j++) {
                const participant = {
                    firstName: selectedProfiles[i].name.first,
                    lastName: selectedProfiles[i].name.last,
                    dobYear: 1933
                }
                participantsArr.push(participant);
            }
        }
        const requestObject = {
            isAgentOverride: CHECKOUT_CONST.IS_AGENT_OVERRIDE,
            OfacParticipants: participantsArr
        }
        return requestObject;
    }

}
