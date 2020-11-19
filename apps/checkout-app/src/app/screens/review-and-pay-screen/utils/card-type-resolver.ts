/* eslint linebreak-style: [2, "windows"] */
export interface CardType {
  niceType: string;
  type: string;
  patterns: any[];
  gaps: number[];
  lengths: number[];
  code: {
    name: string;
    size: number;
  };
}

export const cardTypes = {
  visa: {
    niceType: 'Visa',
    type: 'visa',
    patterns: [4],
    gaps: [4, 8, 12],
    lengths: [16, 18, 19],
    code: {
      name: 'CVV',
      size: 3,
    },
  } as CardType,
  mastercard: {
    niceType: 'Mastercard',
    type: 'mastercard',
    patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVC',
      size: 3,
    },
  } as CardType,
  americanexpress: {
    niceType: 'American Express',
    type: 'americanexpress',
    patterns: [34, 37],
    gaps: [4, 10],
    lengths: [15],
    code: {
      name: 'CID',
      size: 4,
    },
  } as CardType,
  dinersclub: {
    niceType: 'Diners Club',
    type: 'dinersclub',
    patterns: [[300, 305], 36, 38, 39],
    gaps: [4, 10],
    lengths: [14, 16, 19],
    code: {
      name: 'CVV',
      size: 3,
    },
  } as CardType,
  discover: {
    niceType: 'Discover',
    type: 'discover',
    patterns: [6011, [644, 649], 65],
    gaps: [4, 8, 12],
    lengths: [16, 19],
    code: {
      name: 'CID',
      size: 3,
    },
  } as CardType,
  jcb: {
    niceType: 'JCB',
    type: 'jcb',
    patterns: [2131, 1800, [3528, 3589]],
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {
      name: 'CVV',
      size: 3,
    },
  } as CardType,
  unionpay: {
    niceType: 'UnionPay',
    type: 'unionpay',
    patterns: [
      620,
      [624, 626],
      [62100, 62182],
      [62184, 62187],
      [62185, 62197],
      [62200, 62205],
      [622010, 622999],
      622018,
      [622019, 622999],
      [62207, 62209],
      [622126, 622925],
      [623, 626],
      6270,
      6272,
      6276,
      [627700, 627779],
      [627781, 627799],
      [6282, 6289],
      6291,
      6292,
      810,
      [8110, 8131],
      [8132, 8151],
      [8152, 8163],
      [8164, 8171],
    ],
    gaps: [4, 8, 12],
    lengths: [14, 15, 16, 17, 18, 19],
    code: {
      name: 'CVN',
      size: 3,
    },
  } as CardType,
  maestro: {
    niceType: 'Maestro',
    type: 'maestro',
    patterns: [
      493698,
      [500000, 504174],
      [504176, 506698],
      [506779, 508999],
      [56, 59],
      63,
      67,
      6,
    ],
    gaps: [4, 8, 12],
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    code: {
      name: 'CVC',
      size: 3,
    },
  } as CardType,
  elo: {
    niceType: 'Elo',
    type: 'elo',
    patterns: [
      401178,
      401179,
      438935,
      457631,
      457632,
      431274,
      451416,
      457393,
      504175,
      [506699, 506778],
      [509000, 509999],
      627780,
      636297,
      636368,
      [650031, 650033],
      [650035, 650051],
      [650405, 650439],
      [650485, 650538],
      [650541, 650598],
      [650700, 650718],
      [650720, 650727],
      [650901, 650978],
      [651652, 651679],
      [655000, 655019],
      [655021, 655058],
    ],
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVE',
      size: 3,
    },
  } as CardType,
  mir: {
    niceType: 'Mir',
    type: 'mir',
    patterns: [[2200, 2204]],
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {
      name: 'CVP2',
      size: 3,
    },
  } as CardType,
  hiper: {
    niceType: 'Hiper',
    type: 'hiper',
    patterns: [637095, 637568, 637599, 637609, 637612],
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVC',
      size: 3,
    },
  } as CardType,
  hipercard: {
    niceType: 'Hipercard',
    type: 'hipercard',
    patterns: [606282],
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVC',
      size: 3,
    },
  } as CardType,
};

// TODO need to add all card types
export const cardIssuedBy = {
  VI: 'visa',
  CA: 'mastercard',
  AX: 'americanexpress',
  DS: 'discover',
  TO: 'maestro',
  DC: 'diners-club',
  JC: 'jcb',
  UP: 'unionpay'
};

export class ResolveCardType {
  static getCardTypeKeyName(issuedBy): string {
    return cardIssuedBy[issuedBy] || '';
  }
}
