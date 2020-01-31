import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { UserIdleModule } from "node_modules/angular-user-idle";

import { AppRoutingModule } from "./routes/app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./module/login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AccountComponent } from "./module/account/account.component";
import { BookingComponent } from "./module/booking/booking.component";
import { AccountModule } from "./module/account/account.module";
import { BookingModule } from "./module/booking/booking.module";
import { HeaderComponent } from "./components/header/header.component";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    BookingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountModule,
    BookingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserIdleModule.forRoot({
      idle: environment.idle,
      timeout: environment.timeout,
      ping: environment.ping
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
