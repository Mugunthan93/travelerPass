import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/service/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UserIdleService } from "angular-user-idle";
import { UserType } from "src/app/models/interfaces";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit, OnDestroy {
  logoutSub: Subscription;
  IdleSub: Subscription;
  TimeOutSub: Subscription;

  idleTimer: number;

  user: UserType;

  constructor(
    public authService: AuthService,
    public router: Router,
    public userIdle: UserIdleService
  ) {}

  ngOnInit() {
    this.userIdle.startWatching();
    this.IdleSub = this.userIdle.onTimerStart().subscribe((timer: number) => {
      this.idleTimer = timer;
    });
    this.TimeOutSub = this.userIdle.onTimeout().subscribe((status: boolean) => {
      if (status) {
        this.userIdle.stopTimer();
        this.userIdle.stopWatching();
        this.onLogOut();
      }
    });
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  onLogOut() {
    this.logoutSub = this.authService.logout().subscribe(resData => {
      console.log(resData);
      this.router.navigate(["login"]);
    });
  }

  ngOnDestroy(): void {
    this.IdleSub.unsubscribe();
    this.TimeOutSub.unsubscribe();
    this.logoutSub.unsubscribe();
  }
}
