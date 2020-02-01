import { Component, OnInit, OnDestroy, DoCheck } from "@angular/core";
import { AuthService } from "src/app/service/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UserIdleService } from "angular-user-idle";
import { UserType } from "src/app/models/interfaces";
import { companyType } from 'src/app/models/interfaces/types';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit, OnDestroy {

  previousAuthState : boolean = false;

  authSub : Subscription;
  logoutSub: Subscription;
  IdleSub: Subscription;
  TimeOutSub: Subscription;
  userSub : Subscription;
  companySub : Subscription;

  idleTimer: number;

  user: UserType;
  companyDetail: companyType[];

  constructor(
    public authService: AuthService,
    public router: Router,
    public userIdle: UserIdleService
  ) {}

  ngOnInit() {

    this.authSub = this.authService.userIsAuthenticated.subscribe(
      (resData) => {
        console.log(resData,this.previousAuthState);
      }
    );

    this.userIdle.startWatching();
    this.IdleSub = this.userIdle.onTimerStart().subscribe((timer: number) => {
      this.idleTimer = timer;
    });
    this.TimeOutSub = this.userIdle.onTimeout().subscribe((status: boolean) => {
      if (status) {
        this.userIdle.stopTimer();
        this.userIdle.stopWatching();
      }
    });

    this.userSub = this.authService.getUser.subscribe(
    (resData) => {
      this.user = resData;
      console.log(resData);
    }
    );
    this.companySub = this.authService.getCompanyDetails.subscribe(
      (resData) => {
        this.companyDetail = resData;
        console.log(resData);

      }
    );
  }

  ngOnDestroy(): void {
    this.IdleSub.unsubscribe();
    this.TimeOutSub.unsubscribe();
    this.userSub.unsubscribe();
    this.companySub.unsubscribe();
  }
}
