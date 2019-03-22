import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

import { IStorageUserDetails } from "../models/local-storage.model";
import { Environment } from "../utils/environment";

const USER_DETAILS = Environment.STORAGE_USER_DETAILS;

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  userDetails = {
    Email: "",
    Password: "",
    Name: "",
    CenterID: 0,
    CenterName: "",
    CenterTypeCode: "",
    Tenant: "",
    TenantID: 0,
    AccessID: 0,
    AuthToken: ""
  } as IStorageUserDetails;

  constructor(private storage: Storage) {}

  async saveUserDetailsToStorage(userDetails: IStorageUserDetails) {
    var jsonUserDetails = JSON.stringify(userDetails);
    this.storage.set(USER_DETAILS, jsonUserDetails);

    this.getUserDetailsFromStorage();
  }

  private getUserDetailsFromStorage() {
    this.storage.get(USER_DETAILS).then(res => {
      let result = {} as IStorageUserDetails;

      if (res) {
        this.userDetails = JSON.parse(res);
      } else {
        this.userDetails = result;
      }
    });
  }

  getUserDetails(): IStorageUserDetails {
    this.getUserDetailsFromStorage();
    return this.userDetails;
  }

  addNewKeyValue(key: string, value: any) {
    let jsonValue = JSON.stringify(value);
    this.storage.set(key, jsonValue);
  }

  getKeyValue(key: string): any {
    this.storage.get(key);
  }

  removeKeyValue(key: string) {
    this.storage.remove(key);
  }
}
