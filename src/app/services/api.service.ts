import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "./../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    authUrl = environment.authUrl;
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    //#region "Authentication" 

    login(email: string, password: string) {
        return this.http.get("https://jsonplaceholder.typicode.com/posts/1")
            .pipe(
                map(results => {
                    console.log(results);
                })
            );
    }

    logout() { }

    forgotPassword(email: string) { }

    //#endregion "Authentication"

    //#region "Stock Upload"  
    //#endregion "Stock Upload"

    //#region "Order Fulfillment"  
    //#endregion "Order Fulfillment"
}  