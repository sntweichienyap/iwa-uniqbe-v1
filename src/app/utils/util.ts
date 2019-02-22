import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MenuController} from "@ionic/angular";

import { Environment } from "./environment";

@Injectable()
export class Util {
  constructor() { }

  async resetForm(formGroup: FormGroup) {
    formGroup.reset();
  }

  async showMenu(menu: MenuController) {
    menu.enable(true);
  }

  async hideMenu(menu: MenuController) {
    menu.enable(false);
  }

  isApiSuccess(value: string){
    return value === Environment.API_FLAG_SUCCESS;
  }
}
