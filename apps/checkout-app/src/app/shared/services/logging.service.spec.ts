import { TestBed } from '@angular/core/testing';
import { Logger, TraceLog } from '@orxe-sdk/logging';

import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@core/core.module';
import { HttpMocker } from '../utils/http-mocker';
import { LoggingService } from './logging.service';
import { AppState } from '@orxe-sdk/app-state';

describe('LoggingService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    Logger.init = jest.fn().mockImplementation(() => {});
    Logger.logTrace = jest.fn();
    service = TestBed.inject(LoggingService);
  });

  it('logging service should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should call logTrace mock function', () => {
    service.traceLog();
    expect(Logger.logTrace).toHaveBeenCalled();
  });
});
