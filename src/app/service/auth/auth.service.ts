import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AccountUser, BookingUser } from "../../models/classes";
import { environment } from "src/environments/environment";
import {
  LoginUser,
  UserType,
  LogOutUserResponse
} from "src/app/models/interfaces";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<UserType>(null);
  options = {
    headers: new HttpHeaders().append("key", "value"),
    withCredentials: true
  };

  constructor(private http: HttpClient, private router: Router) {}

  get getUser() {
    return this._user.asObservable();
  }

  login(userName, password): Observable<any> {
    let user: LoginUser = {
      username: userName,
      password: password
    };
    return this.http
      .post<UserType>(environment.baseURL + "/users/login", user, this.options)
      .pipe(
        map(loginResponse => {
          console.log(loginResponse.role);
          if (
            loginResponse.role === "accounts" ||
            loginResponse.role === "management" ||
            loginResponse.role === "buisnesshead"
          ) {
            let accountUser = new AccountUser(loginResponse);
            this._user.next(accountUser);
            sessionStorage.setItem("user", JSON.stringify(accountUser));
            this.router.navigate(["account"]);
            return accountUser;
          } else {
            let bookingUser = new BookingUser(loginResponse);
            this._user.next(bookingUser);
            this.router.navigate(["booking"]);
            return bookingUser;
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<LogOutUserResponse>(
        environment.baseURL + "/users/logout",
        {},
        this.options
      )
      .pipe(
        map((logoutResponse: LogOutUserResponse) => {
          sessionStorage.removeItem("user");
          this._user.next(null);
          return logoutResponse;
        })
      );
  }
}
