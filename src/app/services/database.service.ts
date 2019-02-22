import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { IUserDetailsStorage } from '../models/local-storage.model';

const USER_DETAILS = "userDetails";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage) {
  }

  async saveUserDetails(userDetails: IUserDetailsStorage) {
    var jsonUserDetails = JSON.stringify(userDetails);
    this.storage.set(USER_DETAILS, jsonUserDetails);
  }

  getUserDetails(): Promise<IUserDetailsStorage> {
    return this.storage.get(USER_DETAILS).then(res => {
      let result = {} as IUserDetailsStorage;
      if (res) {        
        return result = JSON.parse(res);
      }
      else {
        return result;
      }
    });
  }
}
