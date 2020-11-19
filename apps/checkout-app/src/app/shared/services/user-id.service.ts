import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserIdService {
  constructor() {}
  storeUserId(userId) {
    sessionStorage.setItem('userId', userId);
  }
  getUserId() {
    return sessionStorage.getItem('userId');
  }
}
