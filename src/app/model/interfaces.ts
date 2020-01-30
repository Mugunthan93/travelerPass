import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface LoginUser {
  username: string;
  password: string;
}

export interface UserType {}

export interface AccountUserType {
  id: number;
  dob: string;
  city: string;
  name: string;
  role: string;
  email: string;
  grade: string;
  gender: string;
  status: string;
  address: string;
  approver: string;
  lastname: string;
  password: string;
  sales_id: string;
  createdAt: string;
  updatedAt: string;
  PAN_number: string;
  created_by: string;
  credit_req: string;
  customer_id: number;
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
}

export interface BookingUserType {
  id: number;
  customer_id: number;
  name: string;
  designation: string;
  phone_number: string;
  password: string;
  email: string;
  role: string;
  is_Password_Changed: boolean;
  manager_name: string;
  manager_email: string;
  credit_limit: number;
  validity_period: string;
  approver: Array<object>;
  is_rightsto_book: boolean;
  gst_details: object;
  address: string;
  credit_req: Array<object>;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  sales_id: string;
  status: boolean;
  created_by: string;
  markup_charge: string;
  service_charge: string;
  city: string;
  country_name: string;
  grade: string;
  passport_no: string;
  passport_expiry: string;
  dob: string;
  lastname: string;
  gender: string;
  PAN_number: string;
  createdAt: string;
  updatedAt: string;
}

export interface LogOutUserResponse {
  message: string;
}

export interface optionType {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: "body";
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType: "arraybuffer";
  withCredentials?: boolean;
}
