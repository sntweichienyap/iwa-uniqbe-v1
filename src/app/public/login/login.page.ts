import { Component, OnInit } from "@angular/core";
import { MenuController, IonFab } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { DatabaseService, UserDetails } from "./../../services/database.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { Util } from "./../../utils/util";
import { EmailValidator } from "./../../validators/emailValidator";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private util: Util,
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngOnInit(): void {
    let savedUserDetails = this.databaseService.getUserDetails();

    console.log(savedUserDetails);
    //this.loginForm.controls.email= savedUserDetails.email;
    this.util.hideMenu(this.menu);
  }

  loginUser(fab: IonFab) {
    this.submitAttempt = true;
    let isLoginSuccess = true;
    let userDetails: UserDetails = { email: "", password: "" };

    // Call authentication web service here

    if (!isLoginSuccess) {
      // Alert box
      this.alertBox.customShow("Failed", "Invalid authentication", ["OK"]);

      // Loading box
      // this.loaderBox.present();
      // setTimeout(() => {
      //   this.loaderBox.dismiss();
      // }, 5000);
    } else {
      fab.close();

      // let savedUserDetails = this.databaseService.getUserDetails();
      // console.log(savedUserDetails);

      userDetails.email = this.loginForm.controls.email.value;
      userDetails.password = this.loginForm.controls.password.value;

      this.databaseService.saveUserDetails(userDetails);

      this.authService.login();

      this.util.showMenu(this.menu);
    }
  }

  forgotPassword() {
    let savedUserDetails = this.databaseService.getUserDetails();
    console.log(savedUserDetails);

    this.router.navigate(["/forgot-password"]).then(res => {
      this.util.resetForm(this.loginForm);
    });
  }
}
