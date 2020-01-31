import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/service/auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  login: FormGroup;
  demoLogin: boolean;
  logSub: Subscription;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.login = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null)
    });

    this.demoLogin = environment.production;
  }

  onLogin() {
    if (this.login.valid) {
      this.logSub = this.authService
        .login(this.login.value.name, this.login.value.password)
        .subscribe(resData => {
          console.log(resData);
        });
    }
  }

  ngOnDestroy() {
    this.logSub.unsubscribe();
  }
}
