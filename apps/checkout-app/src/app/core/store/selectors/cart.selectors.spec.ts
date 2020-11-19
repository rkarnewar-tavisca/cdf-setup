import { selectCartDetail, selectClpFlow, selectClientProgramFee, selectPaymentOption } from './cart.selectors';

const initialState = {
  cartInfo: {
    paymentOption: {
      redeemed: 'cash',
      isAccordionOpen: true
    },
    clpEnabled: 'CLP',
    cartDetails: {
      id: '0f8fad5b-d9cb-461f-a165-70867728951z',
      currency: 'USD',
      pointsType: 'points',
      trackingId: '123456',
      items: [],
      price: {
        breakup: {
          fees: [
            {
              amount: 15,
              description: "fee applied for processing order",
              id: "99q9q-d4sb-2asf-a165-q2w123sa",
              points: 0,
              type: "orderFee",
              waivedComponent: null
            }
          ]
        }
      }
    },
    products: [],
  },
};

describe('clpFlowSelector', () => {
  it('should return app flow', () => {
    expect(selectClpFlow.projector(initialState)).toEqual(
      initialState.cartInfo.clpEnabled
    );
  });

  it('should return undefined when CartInfo is not set', () => {
    const newState = { ...initialState };
    newState.cartInfo = undefined;
    expect(selectClpFlow.projector(newState)).toEqual(undefined);
  });
});

describe('CartSelectors', () => {
  it('should return cart details', () => {
    expect(selectCartDetail.projector(initialState)).toEqual(initialState);
  });
});

describe('CartSelectors', () => {
  it('should return client program fee', () => {
    expect(selectClientProgramFee.projector(initialState)).toEqual(15);
  });

  it('should return client program fee zero when getClientProgramFee function called without fee ', () => {
    const initialState = {
      cartInfo: {
        cartDetails: {
          price: {
            breakup: {}
          }
        }
      }
    }
    expect(selectClientProgramFee.projector(initialState)).toEqual(0);
  });
});

describe('CartSelectors', () => {
  it('should return payment option', () => {
    expect(selectPaymentOption.projector(initialState)).toEqual({"isAccordionOpen": true, "redeemed": "cash"});
  });

  it('should return empty payment option when called on initial page load', () => {
    const initialState = {
      cartInfo: {
        cartDetails: {
          price: {
            breakup: {}
          }
        },
        paymentOption: {}
      }
    }
    expect(selectPaymentOption.projector(initialState)).toEqual({});
  });
});