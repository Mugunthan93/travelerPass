import { Component, OnInit, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UserType } from "src/app/models/interfaces";
import { AuthService } from "src/app/service/auth/auth.service";
import { Subscription } from "rxjs";
import { User } from "src/app/models/classes";
import { companyType } from 'src/app/models/interfaces/types';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  dashboardOutlet: any;
  onboardOutlet: any;

  @Input() currentUser: User;
  @Input() currentCompanyDetail : companyType[];
  logoutSub: Subscription;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.dashboardOutlet = [{ outlets: { main: "dashboard" } }];
    this.onboardOutlet = [{ outlets: { main: "onboard" } }];
  }

  MyProfile() {
    this.router.navigate(["accounts/my_profile"]);
  }

  resetPassword() {
    this.router.navigate(["/change_password"]);
  }

  onLogOut() {
    this.logoutSub = this.authService.logout().subscribe(resData => {
      console.log(resData);
      this.router.navigate(["login"]);
    });
  }
}
