import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { DatabaseService } from "./../../services/database.service";
import { AuthenticationService } from "./../../services/authentication.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
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
    private menu: MenuController,
    private formBuilder: FormBuilder
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
    this.menu.enable(false);
  }

  loginUser() {
    this.submitAttempt = true;

    if (!this.loginForm.valid) {
      return;
    }

    let isLoginSuccess = true;
    // Call authentication web service here

    if (!isLoginSuccess) {
      // Alert box
      this.alertBox.show("Failed", "Invalid authentication", ["OK"]);

      // Loading box
      // this.loaderBox.present();
      // setTimeout(() => {
      //   this.loaderBox.dismiss();
      // }, 5000);
    } else {
      //this.loginForm.reset();

      this.databaseService.saveUserDetails(this.loginForm.controls.email.value);

      this.authService.login();

      this.menu.enable(true);
    }
  }
}
