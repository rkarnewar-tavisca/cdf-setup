import { assetUrl } from './asset-url';

(global as any).window.__webpack_public_path__ = 'BASE_URL';
describe('Asset url util', () => {
  it('should exist', () => {
    expect(assetUrl).toBeDefined();
  });

  it('should return path to setting.json', () => {
    expect(assetUrl('settings.json')).toStrictEqual('BASE_URL/assets/settings.json');
    (global as any).window.__webpack_public_path__ = '/BASE_URL/';
    expect(assetUrl('/settings.json')).toStrictEqual('/BASE_URL/assets/settings.json');
  });

});
