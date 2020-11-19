import { Injectable } from '@angular/core';
import { Logger, TraceLog } from '@orxe-sdk/logging';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private _logger;

  constructor() {
    this._logger = Logger;
  }

  traceLog(body: TraceLog) {
    this._logger.logTrace(body);
  }
}
