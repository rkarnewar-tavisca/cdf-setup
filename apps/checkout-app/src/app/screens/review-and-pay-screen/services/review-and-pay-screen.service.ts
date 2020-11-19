import { Injectable } from '@angular/core';
import { IBillingAddress, ISavedCard } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewAndPayService {
  mapProfileAddresses(profileInfo) {
    let addressArray = [];
    for (const key in profileInfo) {
      if (key === 'profile') {
        addressArray = [
          ...addressArray,
          ...profileInfo[key].addresses.map((address) =>
            this.getAddressInfo(profileInfo, address, key)
          ),
        ];
        addressArray = [
          ...addressArray,
          ...profileInfo[key].cards.map((address) =>
            this.getAddressInfo(profileInfo, address.billingAddress, key)
          ),
        ];
      }
      if (key === 'subProfiles') {
        for (let i = 0; i < profileInfo[key].length; i++) {
          addressArray = [
            ...addressArray,
            ...profileInfo[key][i].addresses.map((address) => ({
              ...address,
              profileId: profileInfo['profile'].id,
              profileName: `${profileInfo[key][i].basicInfo.name.first} ${profileInfo[key][i].basicInfo.name.last}`,
              isSubProfile: true,
              subProfileId: profileInfo[key][i].id,
            })),
          ];
        }
      }
    }
    return addressArray;
  }

  getAddressInfo(profileInfo, address, key) {
    return {
      ...address,
      profileId: profileInfo[key]?.id,
      profileName: `${profileInfo[key]?.basicInfo?.name.first} ${profileInfo[key]?.basicInfo?.name.last}`,
      isSubProfile: false,
      subProfileId: null,
    };
  }

  mapAddressObject(addressArray, billingAddress) {
    if (billingAddress) {
      if (billingAddress.selectAddress) {
        const selectedAddress = addressArray.filter(
          (address) => address.id === billingAddress.selectAddress
        );
        const updatedAddress: IBillingAddress = {
          id: billingAddress.selectAddress,
          type: selectedAddress[0]?.type,
          line1: billingAddress?.line1,
          line2: billingAddress?.line2,
          city: billingAddress?.city,
          state: billingAddress?.state,
          countryCode: billingAddress?.countryCode,
          postalCode: billingAddress?.postalCode,
        };
        if (billingAddress?.type === 'usMilitery') {
          updatedAddress.type = 'usMilitery';
        }
        return updatedAddress;
      } else {
        let newAddress: IBillingAddress = {
          type: 'new',
          line1: billingAddress?.line1,
          line2: billingAddress?.line2,
          city: billingAddress?.city,
          state: billingAddress?.state,
          countryCode: billingAddress?.countryCode,
          postalCode: billingAddress?.postalCode,
        };
        if (billingAddress.usMilitary) {
          newAddress.type = 'usMilitary';
        }
        return newAddress;
      }
    }
  }

  // TO DO : Call Profile SDK Method
  updateProfileBFF(address, profileInfo) {
    if (address?.id) {
      // TO DO : call profile SDK to update the current address
    } else {
      // TO DO : call profile SDK to add new address in BFF
    }
  }

  // TO DO : Call Profile SDK Method
  saveCard(cardInfo, profileInfo) {
    // TO DO : call profile SDK to add new card in BFF
    const mappedCardObject = this.mapCardObject(cardInfo);
  }

  // TO DO: Need discussion regarding id property here, so added dummy id here
  mapCardObject(cardInfo) {
    const mappedObject: ISavedCard = {
      id: 'dummy-id',
      token: cardInfo.token,
      num: cardInfo.number,
      nameOnCard: cardInfo.cardHolderName,
      issuedBy: cardInfo.issuedBy,
      expiry: {
        month: cardInfo.expirationDate.month,
        year: cardInfo.expirationDate.year,
      },
    };
    return mappedObject;
  }
}
