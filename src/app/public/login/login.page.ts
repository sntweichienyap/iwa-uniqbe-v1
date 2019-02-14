import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
    private alertBox: Alert,
    private loaderBox: Loader,
    private menu: MenuController,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [
        "ywc92@hotmail.com",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "abc123",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ngAfterViewInit(): void {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.loginForm.reset();
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
      this.authService.login();

      this.menu.enable(true);
    }
  }
}
