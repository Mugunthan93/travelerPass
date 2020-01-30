import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/service/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit, OnDestroy {
  logoutSub: Subscription;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {}

  onLogOut() {
    this.logoutSub = this.authService.logout().subscribe(resData => {
      console.log(resData);
      this.router.navigate(["login"]);
    });
  }

  ngOnDestroy(): void {
    this.logoutSub.unsubscribe();
  }
}
