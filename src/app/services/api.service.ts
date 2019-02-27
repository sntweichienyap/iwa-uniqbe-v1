import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { environment } from "./../../environments/environment";
import * as UserInterface from "../models/user.model";
import * as StockUploadInterface from "../models/stock-upload.model";
import * as CenterInterface from "../models/center.model";

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
  constructor(private httpClient: HttpClient) { }

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

  //#region Center

  centerIndex(
    request: CenterInterface.ICenterIndexRequest
  ): Observable<CenterInterface.ICenterIndexResponse> {
    const url = `${apiUrl}/centerIndex`;

    return this.httpClient
      .post<CenterInterface.ICenterIndexResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Center

  //#region "Authentication"

  login(
    request: UserInterface.ILoginRequest
  ): Observable<UserInterface.ILoginResponse> {
    const url = `${authUrl}/login`;
    console.log(url);

    return this.httpClient
      .post<UserInterface.ILoginResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout(
    request: UserInterface.ILogoutRequest
  ): Observable<UserInterface.ILogoutResponse> {
    const url = `${authUrl}/logout`;

    return this.httpClient
      .post<UserInterface.ILogoutResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  forgotPassword(
    request: UserInterface.IForgotPasswordRequest
  ): Observable<UserInterface.IForgotPasswordResponse> {
    const url = `${authUrl}/forgotPassword`;

    return this.httpClient
      .post<UserInterface.IForgotPasswordResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion "Authentication"

  //#region "Stock Upload"

  stockUploadIndex(
    request: StockUploadInterface.IStockUploadIndexRequest
  ): Observable<StockUploadInterface.IStockUploadIndexResponse> {
    const url = `${apiUrl}/stockUploadIndex`;

    return this.httpClient
      .post<StockUploadInterface.IStockUploadIndexResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  stockUploadCreate(
    request: StockUploadInterface.IStockUploadCreateRequest
  ): Observable<StockUploadInterface.IStockUploadCreateResponse> {
    const url = `${apiUrl}/stockUploadCreate`;

    return this.httpClient
      .post<StockUploadInterface.IStockUploadCreateResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //#endregion "Stock Upload"

  //#region "Order Fulfillment"
  //#endregion "Order Fulfillment"
}
