import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
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
  { path: "login", loadChildren: "./public/login/login.module#LoginPageModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
