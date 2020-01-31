import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../module/login/login.component";
import { AccountComponent } from "../module/account/account.component";
import { BookingComponent } from "../module/booking/booking.component";
import { GuardService } from "../service/auth/guard.service";
import { DashboardComponent } from "../module/account/dashboard/dashboard.component";
import { OnboardComponent } from "../module/account/onboard/onboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "account",
    component: AccountComponent,
    canLoad: [GuardService],
    canActivate: [GuardService],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        outlet: "main"
      },
      {
        path: "onboard",
        component: OnboardComponent,
        outlet: "main"
      }
    ]
  },
  {
    path: "booking",
    component: BookingComponent,
    canLoad: [GuardService],
    canActivate: [GuardService]
  }
];

@NgModule({
  declarations: [DashboardComponent, OnboardComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
