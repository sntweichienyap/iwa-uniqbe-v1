import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, Event, NavigationEnd, ActivatedRoute } from "@angular/router";
import { AlertController, IonItemSliding } from "@ionic/angular";
import { Subscription } from "rxjs";

import { DatabaseService } from "./../../services/database.service";
import { Alert } from "./../../utils/alert";
import { Loader } from "./../../utils/loader";
import { ApiService } from "./../../services/api.service";
import { IStockUploadDetailsRequest } from "./../../models/stock-upload.model";
import { Environment } from "./../../utils/environment";
import { IStorageStockUploadItemList } from "./../../models/local-storage.model";
import { Form, FormGroup } from "@angular/forms";

@Component({
  selector: "app-stock-upload-details",
  templateUrl: "./stock-upload-details.page.html",
  styleUrls: ["./stock-upload-details.page.scss"]
})
export class StockUploadDetailsPage implements OnInit, OnDestroy {
  canConfirm = false;
  isVisible = true;
  navigationSubscription: Subscription;
  paramSubscription: Subscription;
  stockUploadID: number;
  storageStockUploadItemList = { ItemList: [] } as IStorageStockUploadItemList;
  stockUploadDetails = {
    stockUploadID: 0,
    center: "",
    canAddItem: false,
    doNo: "",
    poNo: "",
    awbNo: "",
    subject: "",
    receiveDT: "",
    remark: "",
    status: "",
    poItemList: []
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private alertBox: Alert,
    private loaderBox: Loader,
    private apiService: ApiService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.stockUploadID = +params.get("stockUploadID");
    });

    this.getStockUploadItemListFromStorage();
    this.getStockUploadDetails();

    this.navigationSubscription = this.router.events.subscribe(
      (event: Event) => {
        if (
          event instanceof NavigationEnd &&
          event.url.includes("/stock-upload-details")
        ) {
          this.getStockUploadItemListFromStorage();
          this.getStockUploadDetails();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }

    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  onConfirm(form: FormGroup) {
    console.log(JSON.stringify(form.value));

    this.stockUploadDetails.poItemList.forEach(item =>{
      console.log(form.get(`fulfillQty-${item.ItemID}`).value);
    });

    console.log("Confirm");
  }

  onUpdate() {
    this.router.navigateByUrl(
      `/stock-upload-edit-details/${this.stockUploadID}`
    );
  }

  onScanBarcode() {
    console.log("barcode scan");
  }

  onCreateItem() {
    this.router.navigateByUrl(`/stock-upload-create-item/${this.stockUploadID}`);
  }

  onRemoveItem(itemID: number) {
    console.log(`item removed => ${itemID}`);

    this.presentRemoveItemAlertConfirm(itemID);
  }

  onViewItem(slidingItem: IonItemSliding, itemID: number) {
    console.log(`item view => ${itemID}`);
    slidingItem.closeOpened();
    this.router.navigateByUrl("/stock-upload-item-details");
  }

  onBackToHome() {
    this.presentBackToHomeAlertConfirm();
  }

  toggleInfoList() {
    this.isVisible = !this.isVisible;
  }

  hasFulfillItem(): boolean {
    return this.stockUploadDetails.poItemList.some(function (element) {
      return element.FulfillQuantity > 0;
    })
  }

  private async presentRemoveItemAlertConfirm(itemID: number) {
    const alert = await this.alertCtrl.create({
      header: 'Caution',
      message: 'This item will be removed',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log(`Item alert okay removed => ${itemID}`);
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentBackToHomeAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Caution',
      message: 'Item added will be forfeit without confirm',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            this.databaseService.removeKeyValue(Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST);
            this.router.navigateByUrl("/home");
          }
        }
      ]
    });

    await alert.present();
  }

  private getStockUploadDetails() {
    let request: IStockUploadDetailsRequest = {
      StockUploadID: this.stockUploadID,
      AccessID: this.databaseService.getUserDetails().AccessID
    };

    this.loaderBox.present().then(() => {
      this.apiService.stockUploadDetails(request).subscribe(
        data => {
          this.loaderBox.dismiss();

          if (data.ResponseCode.isApiSuccess()) {
            this.stockUploadDetails.stockUploadID = data.StockUploadID;
            this.stockUploadDetails.center = data.CenterName;
            this.stockUploadDetails.doNo = data.DONo;
            this.stockUploadDetails.poNo = data.PONo;
            this.stockUploadDetails.awbNo = data.AWBNumber;
            this.stockUploadDetails.subject = data.Subject;
            this.stockUploadDetails.receiveDT = data.ReceiveDT;
            this.stockUploadDetails.remark = data.Remark;
            this.stockUploadDetails.status = data.Status;
            this.stockUploadDetails.canAddItem = data.PONo.isEmpty();

            // No PO, user can add their own SKU
            if (this.stockUploadDetails.canAddItem) {
              if (!this.storageStockUploadItemList.ItemList) {
                return;
              }

              this.stockUploadDetails.poItemList.splice(0, this.stockUploadDetails.poItemList.length);

              this.storageStockUploadItemList.ItemList.forEach(element => {
                this.stockUploadDetails.poItemList.push({
                  ItemID: element.ItemID,
                  CategoryID: element.CategoryID,
                  Category: element.Category,
                  BrandID: element.BrandID,
                  Brand: element.Brand,
                  ModelID: element.ModelID,
                  Model: element.Model,
                  ColourID: element.ColourID,
                  Colour: element.Colour,
                  TypeID: element.TypeID,
                  Type: element.Type,
                  IsSerial: element.IsSerial,
                  OrderQuantity: element.OrderQuantity,
                  FulfillQuantity: element.FulfillQuantity,
                });
              });
            }
            else { // Has PO, SKU will be loaded from system
              if (!data.POItemList) {
                return;
              }

              let itemCount = 1;
              data.POItemList.forEach(element => {
                this.stockUploadDetails.poItemList.push({
                  ItemID: itemCount++,
                  CategoryID: element.CategoryID,
                  Category: element.Category,
                  BrandID: element.BrandID,
                  Brand: element.Brand,
                  ModelID: element.ModelID,
                  Model: element.Model,
                  ColourID: element.ColourID,
                  Colour: element.Colour,
                  TypeID: element.TypeID,
                  Type: element.Type,
                  IsSerial: element.IsSerial,
                  OrderQuantity: element.OrderQuantity,
                  FulfillQuantity: 0,
                });
              });
            }

            this.canConfirm = this.hasFulfillItem();
          }
          else {
            this.alertBox.apiFailShow(data.ResponseMessage);
          }
        },
        error => {
          this.loaderBox.dismiss();
        }
      );
    });
  }

  private getStockUploadItemListFromStorage() {
    let storageResult = this.databaseService.getKeyValue(Environment.STORAGE_STOCK_UPLOAD_ITEM_LIST);

    if (storageResult) {
      this.storageStockUploadItemList = JSON.parse(storageResult);
    }

    this.storageStockUploadItemList.ItemList.splice(0, this.storageStockUploadItemList.ItemList.length);

    this.storageStockUploadItemList.ItemList.push({
      ItemID: 1,
      CategoryID: 1,
      Category: "Phone",
      BrandID: 1,
      Brand: "Apple",
      ModelID: 1,
      Model: "iPhone Xs Max",
      ColourID: 1,
      Colour: "Black",
      TypeID: 1,
      Type: "Sales",
      IsSerial: true,
      OrderQuantity: 10,
      FulfillQuantity: 0,
      SerialImei: []
    });

    this.storageStockUploadItemList.ItemList.push({
      ItemID: 2,
      CategoryID: 2,
      Category: "Cable",
      BrandID: 2,
      Brand: "Apple",
      ModelID: 2,
      Model: "USB-C Cable",
      ColourID: 2,
      Colour: "Other",
      TypeID: 2,
      Type: "Sales",
      IsSerial: false,
      OrderQuantity: 30,
      FulfillQuantity: 30,
      SerialImei: []
    });

    this.storageStockUploadItemList.ItemList.push({
      ItemID: 3,
      CategoryID: 2,
      Category: "Cable",
      BrandID: 2,
      Brand: "Samsung",
      ModelID: 2,
      Model: "Samsung Cable",
      ColourID: 2,
      Colour: "Other",
      TypeID: 2,
      Type: "Sales",
      IsSerial: false,
      OrderQuantity: 50,
      FulfillQuantity: 50,
      SerialImei: []
    });
  }
}
