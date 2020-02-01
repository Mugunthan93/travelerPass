import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, from } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";

import { AccountUser, BookingUser, User } from "../../models/classes";
import { environment } from "src/environments/environment";
import {
  LoginUser,
  UserType,
  LogOutUserResponse
} from "src/app/models/interfaces";
import { Router } from "@angular/router";
import { companyType, AgencyType } from "src/app/models/interfaces/types";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _user = new BehaviorSubject<UserType>(null);
  private _companyDetails = new BehaviorSubject<companyType[]>(null);

  options = {
    headers: new HttpHeaders().append("key", "value"),
    withCredentials: true
  };

  constructor(private http: HttpClient, private router: Router) {}

  get userIsAuthenticated() {
    return this._user.asObservable()
      .pipe(
        map(
          (user) => {
            if(user){
              return !!user;
            }
            else{
              return false;
            }
          }
        )
      );
  }

  autoLogin() {
    return from(sessionStorage.getItem('user'))
      .pipe(
        map((sessionData) => {
          if(sessionData !== null){
            const parsedData = JSON.parse(sessionData);
            if(parsedData instanceof AccountUser){
              let user = new AccountUser(parsedData);
              return user;
            }
            else if(parsedData instanceof BookingUser){
              let user = new BookingUser(parsedData);
              return user;
            }
          }
          else {
            return null;
          }
        }),
        tap((userData) => {
          if(userData){
            this._user.next(userData);
          }
        }),
        tap((user) => {
          if(user){
            return !!user;
          }
        })
      )
  }

  get getUser() {
    return this._user.asObservable();
  }

  get getCompanyDetails() {
    return this._companyDetails.asObservable();
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
          if (
            loginResponse.role === "accounts" ||
            loginResponse.role === "management" ||
            loginResponse.role === "buisnesshead"
          ) {
            let accountUser = new AccountUser(loginResponse);
            this.storeSession(accountUser);
            this._user.next(accountUser);
            return accountUser;
          } else {
            let bookingUser = new BookingUser(loginResponse);
            this.storeSession(bookingUser);
            this._user.next(bookingUser);
            return bookingUser;
          }
        }),
        switchMap((user) => {
          return this.getCompanyDetail(user);
        }),
        map(user => {
          if(user._value instanceof AccountUser){
            return "account";
          }
          else if(user._value instanceof BookingUser){
            return "booking";
          }
        }),
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
          this.clearSession();
          this._user.next(null);
          return logoutResponse;
        })
      );
  }

  getCompanyDetail(user): Observable<any> {
    return this.http
      .get(environment.baseURL + "/customers/" + user.id, this.options)
      .pipe(
        map((resData : companyType[]) => {
          sessionStorage.setItem("companyDetails", JSON.stringify(resData));
          this._companyDetails.next(resData);
          return this._user;
        })
      );
  }

  storeSession(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  clearSession() {
    sessionStorage.removeItem("user");
  }
}
