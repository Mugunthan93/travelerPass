import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AccountUser, BookingUser } from "../../model/classes";
import { environment } from "src/environments/environment";
import {
  LoginUser,
  AccountUserType,
  BookingUserType,
  LogOutUserResponse
} from "src/app/model/interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<AccountUserType | BookingUserType>(null);
  options = {
    headers: new HttpHeaders().append("key", "value"),
    withCredentials: true
  };

  constructor(private http: HttpClient) {}

  login(userName, password): Observable<any> {
    let user: LoginUser = {
      username: userName,
      password: password
    };
    return this.http
      .post<AccountUserType | BookingUserType>(
        environment.baseURL + "/users/login",
        user,
        this.options
      )
      .pipe(
        map(loginResponse => {
          console.log(loginResponse.role);
          if (
            loginResponse.role === "accounts" ||
            loginResponse.role === "management" ||
            loginResponse.role === "buisnesshead"
          ) {
            let accountUser = new AccountUser(loginResponse);
            return accountUser;
          } else {
            let bookingUser = new BookingUser(loginResponse);
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
          console.log(logoutResponse);
          return logoutResponse;
        })
      );
  }
}
