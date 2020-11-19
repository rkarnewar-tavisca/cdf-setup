import 'jest-preset-angular';
import { AppState } from '@orxe-sdk/app-state';
import { Logger } from '@orxe-sdk/logging';
import { SiteSettingService } from '@orxe-settings/core';
beforeAll(() => {
  AppState.init();
  AppState.set('cnxTenantId', 'FAKE_ID');
  AppState.set('sessionId', 'FAKE_ID');
  Logger.init('/DUMMY_URL/');
  SiteSettingService.init({
    titleMetaData: {
      prefix: '',
      suffix: '',
    },
  });
  Logger.logError = jest.fn();
  Logger.logTrace = jest.fn();
  Logger.logApi = jest.fn();
});
