import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const EMAIL = 'email';
const PASSWORD = "password";
const USER_DETAILS = "userDetails";

export interface UserDetails {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage) {

  }

  async saveUserDetails(userDetails: UserDetails) {
    // this.storage.set(EMAIL, userDetails.email);

    // this.storage.set(PASSWORD, userDetails.password);

    this.storage.set(USER_DETAILS, userDetails);
  }

  getUserDetails(): UserDetails {
    let userDetails: UserDetails = {
      email: "",
      password: ""
    };

    // this.storage.get(EMAIL).then(res =>{
    //   userDetails.email = res;
    // });

    // this.storage.get(PASSWORD).then(res =>{
    //   userDetails.password = res;
    // });

    this.storage.get(USER_DETAILS).then(res => {
      userDetails = res;
    });

    return userDetails;
  }
}
