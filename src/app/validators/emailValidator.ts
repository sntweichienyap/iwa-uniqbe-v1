import { FormControl } from "@angular/forms";

export class EmailValidator {
  static isValid(control: FormControl): any {
    var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    // var isValidEmail = ;
    if (!regex.test(control.value)) {
      return {
        "not a email": false
      };
    }

    return null;
  }
}
