import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    canActivate: [AuthGuard],
    loadChildren: "./home/home.module#HomePageModule"
  },
  {
    path: "list",
    canActivate: [AuthGuard],
    loadChildren: "./list/list.module#ListPageModule"
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    loadChildren: './inventory/inventory.module#InventoryPageModule'
  },
  {
    path: 'distribution',
    canActivate: [AuthGuard],
    loadChildren: './distribution/distribution.module#DistributionPageModule'
  },
  {
    path: 'stock-upload-create', 
    canActivate: [AuthGuard],
    loadChildren: './stock-upload/stock-upload-create/stock-upload-create.module#StockUploadCreatePageModule'
  },
  {
    path: 'stock-upload-listing', 
    canActivate: [AuthGuard],
    loadChildren: './stock-upload/stock-upload-listing/stock-upload-listing.module#StockUploadListingPageModule'
  },
  { path: "login", loadChildren: "./public/login/login.module#LoginPageModule" },
  { path: 'forgot-password', loadChildren: './public/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'stock-upload-details', loadChildren: './stock-upload/stock-upload-details/stock-upload-details.module#StockUploadDetailsPageModule' },  { path: 'stock-upload-edit-details', loadChildren: './stock-upload/stock-upload-edit-details/stock-upload-edit-details.module#StockUploadEditDetailsPageModule' },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
