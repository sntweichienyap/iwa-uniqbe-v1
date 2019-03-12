// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //#region Url

  // Dev on web
  //authUrl: "http://localhost:1337/iwauniqbedev.azurewebsites.net/api/user",
  //apiUrl: "http://localhost:1337/iwauniqbedevservice.azurewebsites.net/mobileservice.svc",

  apiUrl: "http://http://iwauniqbewebapidev.azurewebsites.net/api/snt/v1",

  // Dev on mobile
  //authUrl: "http://iwauniqbedev.azurewebsites.net/api/user",
  //apiUrl: "http://iwauniqbedevservice.azurewebsites.net/mobileservice.svc"

  // authUrl: "http://iwauniqbewebapidev.azurewebsites.net/api/user",
  // apiUrl: "http://iwauniqberestservicedev.azurewebsites.net/MobileService.svc",

  // Staging
  // authUrl: "http://iwastaging.azurewebsites.net/api/user",
  // apiUrl: "http://iwastagingservice.azurewebsites.net/mobileservice.svc",

  //#endregion
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
