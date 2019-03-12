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
import * as BrandInterface from "../models/brand.model";
import * as CategoryInterface from "../models/category.model";
import * as ModelInterface from "../models/model.model";
import * as ColourInterface from "../models/colour.model";
import * as TypeInterface from "../models/type.model";
import * as UnitOfMeasureInterface from "../models/unit-of-measure.model";

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

      let errorMessage = `Backend returned code ${
        error.status
        }, body was: ${JSON.stringify(error.error)}`;

      console.log(JSON.stringify(error));

      console.error(errorMessage);
      alert(JSON.stringify(error));
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    let body = res;
    return body; //|| {};
  }

  //#endregion

  //#region Category

  categoryIndex(
    request: CategoryInterface.ICategoryIndexRequest
  ): Observable<CategoryInterface.ICategoryIndexResponse> {
    const url = `${apiUrl}/CatogeryIndex`;

    return this.httpClient
      .post<CategoryInterface.ICategoryIndexResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Category

  //#region Brand

  brandIndex(
    request: BrandInterface.IBrandIndexRequest
  ): Observable<BrandInterface.IBrandIndexResponse> {
    const url = `${apiUrl}/BrandIndex`;

    return this.httpClient
      .post<BrandInterface.IBrandIndexResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Brand

  //#region Model

  modelIndex(
    request: ModelInterface.IModelIndexRequest
  ): Observable<ModelInterface.IModelIndexResponse> {
    const url = `${apiUrl}/ModelIndex`;

    return this.httpClient
      .post<ModelInterface.IModelIndexResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Model

  //#region Colour

  colourIndex(
    request: ColourInterface.IColourIndexRequest
  ): Observable<ColourInterface.IColourIndexResponse> {
    const url = `${apiUrl}/ColourIndex`;

    return this.httpClient
      .post<ColourInterface.IColourIndexResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Colour

  //#region Type

  typeIndex(
    request: TypeInterface.ITypeIndexRequest
  ): Observable<TypeInterface.ITypeIndexResponse> {
    const url = `${apiUrl}/TypeIndex`;

    return this.httpClient
      .post<TypeInterface.ITypeIndexResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Type

  //#region Unit of Measure

  unitOfMeasureIndex(
    request: UnitOfMeasureInterface.IUnitOFMeasureIndexRequest
  ): Observable<UnitOfMeasureInterface.IUnitOfMeasureIndexResponse> {
    const url = `${apiUrl}/uomDdl`;

    return this.httpClient
      .post<UnitOfMeasureInterface.IUnitOfMeasureIndexResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //#endregion Unit of Measure

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

  //#region Authentication

  login(
    request: UserInterface.ILoginRequest
  ): Observable<UserInterface.ILoginResponse> {
    const url = `${apiUrl}/Auth/Login`;
    console.log(url);

    return this.httpClient
      .post<UserInterface.ILoginResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout(
    request: UserInterface.ILogoutRequest
  ): Observable<UserInterface.ILogoutResponse> {
    const url = `${apiUrl}/Auth/Logout`;

    return this.httpClient
      .post<UserInterface.ILogoutResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  forgotPassword(
    request: UserInterface.IForgotPasswordRequest
  ): Observable<UserInterface.IForgotPasswordResponse> {
    const url = `${apiUrl}/Auth/ForgotPassword`;

    return this.httpClient
      .post<UserInterface.IForgotPasswordResponse>(url, request, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion Authentication

  //#region Stock Upload

  stockUploadIndex(
    request: StockUploadInterface.IStockUploadIndexRequest
  ): Observable<StockUploadInterface.IStockUploadIndexResponse> {
    const url = `${apiUrl}/StockUploadIndex`;

    return this.httpClient
      .post<StockUploadInterface.IStockUploadIndexResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  stockUploadDetails(
    request: StockUploadInterface.IStockUploadDetailsRequest
  ): Observable<StockUploadInterface.IStockUploadDetailsResponse> {
    const url = `${apiUrl}/StockUploadDetails`;

    return this.httpClient
      .post<StockUploadInterface.IStockUploadDetailsResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  stockUploadCreate(
    request: StockUploadInterface.IStockUploadCreateRequest
  ): Observable<StockUploadInterface.IStockUploadCreateResponse> {
    const url = `${apiUrl}/StockUploadCreate`;

    return this.httpClient
      .post<StockUploadInterface.IStockUploadCreateResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  stockUploadUpdate(
    request: StockUploadInterface.IStockUploadUpdateRequest
  ): Observable<StockUploadInterface.IStockUploadUpdateResponse> {
    const url = `${apiUrl}/StockUploadUpdate`;

    return this.httpClient
      .post<StockUploadInterface.IStockUploadUpdateResponse>(
        url,
        request,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  //#endregion Stock Upload

  //#region Order Fulfillment
  //#endregion Order Fulfillment
}
