import { AssetUrlPipe } from './asset.pipe';
(global as any).window.__webpack_public_path__ = 'hotels';


describe('AssetUrlPipe', () => {
  it('should define AssetPipe', () => {
    expect(AssetUrlPipe).toBeDefined();
  });

  it('should define AssetPipe', () => {
    const assetModule = require('../utils/asset-url');
    const assetUrlSpy = jest.spyOn(assetModule, 'assetUrl');
    const assetUrlPipe = new AssetUrlPipe();

    assetUrlPipe.transform('fakeURL');
    expect(assetUrlSpy).toHaveBeenCalled();

    (global as any).window.__webpack_public_path__ = 'hotels/';

    assetUrlPipe.transform('fakeURL');
    expect(assetUrlSpy).toHaveBeenCalled();

    assetUrlPipe.transform('/fakeURL');
    expect(assetUrlSpy).toHaveBeenCalled();
  });
});
