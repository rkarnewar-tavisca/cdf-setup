import { TestBed } from '@angular/core/testing';

import { UserIdService } from './user-id.service';

describe('UserIdService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdService);
  });

  it('should create user-id service', () => {
    expect(service).toBeTruthy();
  });
  it('should get userId from sessionStorage', () => {
    service.storeUserId('2006');
    expect(service.getUserId()).toBe('2006');
  });
});
