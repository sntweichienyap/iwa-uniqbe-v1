import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { IUserDetailsStorage } from "../models/local-storage.model";

const USER_DETAILS = "userDetails";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  authenticationState = new BehaviorSubject(false);
  userDetails = {
    Email: "weichienyap@seednet.com.my",
    Password: "abc123",
    Name: "Wei Chien",
    CenterID: 44,
    CenterName: "3PL Warehouse Store",
    CenterTypeCode: "WH",
    AccessID: 258
  } as IUserDetailsStorage;

  constructor(private storage: Storage) {}

  async saveUserDetailsToStorage(userDetails: IUserDetailsStorage) {
    var jsonUserDetails = JSON.stringify(userDetails);
    this.storage.set(USER_DETAILS, jsonUserDetails);

    this.getUserDetailsFromStorage();
  }

  private getUserDetailsFromStorage() {
    this.storage.get(USER_DETAILS).then(res => {
      let result = {} as IUserDetailsStorage;

      if (res) {
        this.userDetails = JSON.parse(res);
      } else {
        this.userDetails = result;
      }
    });
  }

  getUserDetails(): IUserDetailsStorage {
    return this.userDetails;
  }
}
