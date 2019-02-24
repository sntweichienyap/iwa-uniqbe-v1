import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MenuController} from "@ionic/angular";

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
}
