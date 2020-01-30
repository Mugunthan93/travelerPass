import { Component } from '@angular/core';
import { Manager, User, Admin } from './class/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travelPass';

  manager: Manager = new Manager("manager", "manager@gmail.com", "12345@1234s5");
  admin: Admin = new Admin("admin", "admin@gmail.com", "67890@67890");

  constructor() {
    console.log(this.manager);
    console.log(this.admin);
    this.manager.absClass();
    this.admin.absClass();
  }
}
