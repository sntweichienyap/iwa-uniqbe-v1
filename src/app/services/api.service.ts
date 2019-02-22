import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import { ILogin } from "../models/user.model";

const authUrl = environment.authUrl;
const apiUrl = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //#region Private Function

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        "Backend returned code ${error.status}, " + "body was: ${error.error}"
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    let body = res;
    return body; //|| {};
  }

  //#endregion

  //#region "Authentication"

  login(email: string, password: string): Observable<ILogin> {
    const url = `${authUrl}/login`;
    let data = { Username: email, Password: password };

    console.log(url);
    return (
      this.http
        .post<ILogin>(url, data, httpOptions)
        // .map( response =>{
        //   let res = response.json();
        // });
        .pipe(catchError(this.handleError))
    );
  }

  // login(email: string, password: string): Observable<any> {
  //   const url = `${authUrl}/login`;
  //   let data = { Username: email, Password: password };

  //   console.log(url);
  //   return this.http
  //     .post(url, data, httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  logout(accessID: number): Observable<any> {
    const url = `${authUrl}/logout`;
    let data = { AccessID: accessID };

    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<any> {
    const url = `${authUrl}/forgotPassword`;
    let data = { Username: email };

    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion "Authentication"

  //#region "Stock Upload"
  //#endregion "Stock Upload"

  //#region "Order Fulfillment"
  //#endregion "Order Fulfillment"
}
