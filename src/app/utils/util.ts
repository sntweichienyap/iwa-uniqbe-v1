import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

@Injectable()
export class Util {
  constructor()
  {}

  async resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;

    formGroup.reset();
    formGroup.markAsUntouched();
    
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }
}
