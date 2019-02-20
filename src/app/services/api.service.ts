import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { environment } from "./../../environments/environment";

const authUrl = environment.authUrl;
const apiUrl = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "X-Requested-With"
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
    return body || {};
  }

  //#endregion

  //#region "Authentication"

  // login(email: string, password: string): Observable<any> {
  //   const url = `${authUrl}/login`;
  //   let data = { email: email, password: password };

  //   return this.http
  //     .post(url, JSON.stringify(data), httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  login(email: string, password: string) {
    console.log(email);
    console.log(password);
    return this.http.get("https://jsonplaceholder.typicode.com/posts/1").pipe(
      map(results => {
        console.log(results);
      })
    );
  }

  logout() {}

  forgotPassword(email: string) {}

  //#endregion "Authentication"

  //#region "Stock Upload"
  //#endregion "Stock Upload"

  //#region "Order Fulfillment"
  //#endregion "Order Fulfillment"
}
