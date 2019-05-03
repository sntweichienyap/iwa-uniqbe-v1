import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-fulfillment-reject-remark",
  templateUrl: "./fulfillment-reject-remark.page.html",
  styleUrls: ["./fulfillment-reject-remark.page.scss"]
})
export class FulfillmentRejectRemarkPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
