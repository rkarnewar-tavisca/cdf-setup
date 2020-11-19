import * as allExports from './';

describe('SharedPipesExport', () => {
  it('should export AssetUrlPipe', () => {
    expect(allExports.AssetUrlPipe.name).toEqual('AssetUrlPipe');
  });
});