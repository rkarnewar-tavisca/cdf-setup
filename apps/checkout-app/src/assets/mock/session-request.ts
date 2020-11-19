export const sessionRequest = {
  agent: {
    email: 'johndoe@gmail.com',
    id: '1234',
    name: {
      title: 'Mr',
      first: 'John',
      middle: 'C',
      last: 'Doe',
    },
  },
  client: {
    id: '5',
    name: 'CapitalOne',
    programGroupId: '447',
    programId: '1371',
    programName: '100 x',
    culture: 'en-US',
    posId: '51',
    cnxTenantId: '3d0d08v4e80',
  },
  userId: 'bscdeff1-9071-405e-8a34-04212b774242',
  programCurrency: {
    type: 'Points',
    value: 50000,
  },
  transitCode: '6dd9f87a-75e9-43c7-8f75-fe2fb2b68be3',
  profile: {
    basicInfo: {
      name: {
        title: 'Mr',
        first: 'John',
        middle: 'P',
        last: 'Smith',
      },
      gender: 'Male',
      dob: '1990-07-13',
      email: 'jsmith@gmail.com',
    },
    addresses: [
      {
        type: 'Home',
        line1: '1010 South connexions loyalty Boulevard',
        line2: 'South Northern Ireland MS 110001',
        city: {
          code: 'AUS',
          name: 'Austin',
        },
        state: {
          code: 'Tx',
          name: 'Texas',
        },
        countryCode: 'United States',
        postalCode: '73301',
      },
    ],
    phones: [
      {
        areaCode: '200',
        type: 'Office',
        countryCode: '+1',
        ext: '123',
        num: '5556136635',
      },
    ],
    emails: [
      {
        type: 'Personal',
        value: 'jsmith@gmail.com',
      },
      {
        type: 'Business',
        value: 'johnsmith@gmail.com',
      },
    ],
  },
  additionalInfo: {
    Key1: 'Value1',
    Key2: 'Value2',
  },
};
