export abstract class User {
  id: number;
  customer_id: number;
  email: string;
  dob: string;
  city: string;
  name: string;
  role: string;
  grade: string;
  gender: string;
  status: string;
  address: string;
  approver: Array<object>;
  lastname: string;
  password: string;
  sales_id: string;
  createdAt: string;
  updatedAt: string;
  PAN_number: string;
  created_by: string;
  credit_req: Array<object>;
  designation: string;
  gst_details: string;
  passport_no: string;
  country_name: string;
  credit_limit: number;
  manager_name: string;
  phone_number: string;
  manager_email: string;
  markup_charge: string;
  service_charge: string;
  passport_expiry: string;
  validity_period: string;
  is_rightsto_book: string;
  resetPasswordToken: string;
  is_Password_Changed: string;
  resetPasswordExpires: string;

  constructor() {}

  accountProperty(obj) {
    for (let [key, val] of Object.entries(obj)) {
      this[key] = val;
    }
  }
}

export class AccountUser<AccountUserType> extends User {

  constructor(accountUser: AccountUserType) {
    super();
    this.accountProperty(accountUser);
  }

}

export class BookingUser<BookingUserType> extends User {

  constructor(bookingUser: BookingUserType) {
    super();
    this.accountProperty(bookingUser);
  }


}
