import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const USER_DETAILS = "userDetails";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage) {
  }

  async saveUserDetails(userDetails: any) {
    var jsonUserDetails = JSON.stringify(userDetails);
    this.storage.set(USER_DETAILS, jsonUserDetails);
  }

  getUserDetails() {
    return this.storage.get(USER_DETAILS).then(res => {
      if (res) {
        return JSON.parse(res);
      }
      else {
        return null;
      }
    });
  }
}
