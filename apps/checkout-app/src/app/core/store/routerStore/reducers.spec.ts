import { CustomSerializer, RouterStateUrl } from './reducers';
import { Params } from '@angular/router';

interface MockActiveStateSnapshot {
  queryParams?: Params;
  params?: Params;
  firstChild: MockActiveStateSnapshot | null;
}

interface MockRouterStateSnapshot {
  url: string;
  root: MockActiveStateSnapshot;
}

describe('CustomSerializer', () => {
  let customSerializer: CustomSerializer;

  beforeEach(() => {
    customSerializer = new CustomSerializer();
  });

  it('should call serialize method', () => {
    const expected: RouterStateUrl = {
      url: '/hotels',
      queryParams: {},
      params: {},
    };
    const input: MockRouterStateSnapshot = {
      url: '/hotels',
      root: {
        queryParams: {},
        firstChild: {
          firstChild: null,
          params: {},
        },
      },
    };

    expect(customSerializer.serialize(input as any)).toEqual(expected);
  });
});
