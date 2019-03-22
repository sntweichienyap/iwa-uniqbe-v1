import { Injectable } from "@angular/core";

import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root"
})
export class GlobalVariableService {
  authToken: string;
  accessID: number;

  constructor(private databaseService: DatabaseService) {}

  setAuthToken(value: string) {
    this.authToken = value;
  }

  getAuthToken() {
    if (!this.authToken) {
      this.authToken = this.databaseService.getUserDetails().AuthToken;
    }

    return this.authToken;
  }

  setAccessID(value: number) {
    this.accessID = value;
  }

  getAccessID() {
    if (!this.accessID) {
      this.accessID = this.databaseService.getUserDetails().AccessID;
    }

    return this.accessID;
  }
}
