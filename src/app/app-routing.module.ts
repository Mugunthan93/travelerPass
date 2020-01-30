import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./module/login/login.component";
import { AccountComponent } from "./module/account/account.component";
import { BookingComponent } from "./module/booking/booking.component";
import { GuardService } from "./service/auth/guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "account",
    component: AccountComponent,
    canLoad: [GuardService],
    canActivate: [GuardService]
  },
  {
    path: "booking",
    component: BookingComponent,
    canLoad: [GuardService],
    canActivate: [GuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
