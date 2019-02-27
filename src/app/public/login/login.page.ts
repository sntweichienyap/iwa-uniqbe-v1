import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuController, IonFab } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, Event, NavigationEnd } from "@angular/router";

import { DatabaseService } from "./../../services/database.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { Util } from "./../../utils/util";
import { EmailValidator } from "./../../validators/emailValidator";
import { ApiService } from "./../../services/api.service";
import { IUserDetailsStorage } from "../../models/local-storage.model";
import "./../../utils/extension-method";
import { ILoginRequest } from "src/app/models/user.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  navigationSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private databaseService: DatabaseService,
    private apiService: ApiService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private utils: Util,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "weichienyap@seednet.com.my",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "abc123",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit() {
    this.utils.hideMenu(this.menu);
    this.getUserDetails();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd && this.router.url === "/login") {
          this.getUserDetails();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private getUserDetails() {
    this.loginForm.patchValue({
      email: this.databaseService.getUserDetails().Email,
      password: this.databaseService.getUserDetails().Password
    });
  }

  loginUser(fab: IonFab) {
    let request: ILoginRequest = {
      Username: this.loginForm.controls.email.value,
      Password: this.loginForm.controls.password.value,
      AccessID: this.databaseService.getUserDetails().AccessID
    };
    let userDetailsStorage = {} as IUserDetailsStorage;

    this.loaderBox.present().then(() => {
      this.apiService.login(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            userDetailsStorage.Email = data.Username;
            userDetailsStorage.Password = request.Password;
            userDetailsStorage.Name = data.Name;
            userDetailsStorage.CenterID = data.CenterID;
            userDetailsStorage.CenterName = data.CenterName;
            userDetailsStorage.CenterTypeCode = data.CenterTypeCode;
            userDetailsStorage.TenantID = data.TenantID;
            userDetailsStorage.Tenant = data.Tenant;
            userDetailsStorage.AccessID = data.AccessID;

            this.databaseService.saveUserDetailsToStorage(userDetailsStorage);

            fab.close();
            this.utils.resetForm(this.loginForm);
            this.authService.login();
            this.utils.showMenu(this.menu);
          } else {
            this.alertBox.apiFailShow(data.ResponseMessage);
          }
        },
        error => {
          this.loaderBox.dismiss();
        }
      );
    });
  }

  forgotPassword() {
    this.router.navigate(["/forgot-password"]).then(res => {
      this.utils.resetForm(this.loginForm);
    });
  }
}
