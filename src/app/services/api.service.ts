import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import {
  ILoginResponse,
  ILogoutResponse,
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  ILoginRequest,
  ILogoutRequest
} from "../models/user.model";

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
  constructor(private httpClient: HttpClient) {
  }

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

  login(request: ILoginRequest): Observable<ILoginResponse> {
    const url = `${authUrl}/login`;
    console.log(url);

    return this.httpClient
      .post<ILoginResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout(request: ILogoutRequest): Observable<ILogoutResponse> {
    const url = `${authUrl}/logout`;

    return this.httpClient
      .post<ILogoutResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  forgotPassword(
    request: IForgotPasswordRequest
  ): Observable<IForgotPasswordResponse> {
    const url = `${authUrl}/forgotPassword`;

    return this.httpClient
      .post<IForgotPasswordResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion "Authentication"

  //#region "Stock Upload"

  //#endregion "Stock Upload"

  //#region "Order Fulfillment"
  //#endregion "Order Fulfillment"
}
