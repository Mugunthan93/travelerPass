import { UserType } from "../interfaces";

export interface cashLimitType {
  days: string;
  amount: number;
}
export interface gstDetailType {
  email: string;
  gstNo: string;
  phoneNumber: string;
}
export interface serviceChargeType {
  state_name: string;
  domesticCharge: number;
  serviceBusCharge: number;
  serviceCarCharge: number;
  serviceHotelCharge: number;
  internationalCharge: number;
}
export interface consolidatorType {
  PCC: string;
  queuenumber: string;
  consolidator_name: string;
}
export interface markupChargeType {
  state_name: string;
  domesticCharge: number;
  serviceBusCharge: number;
  serviceCarCharge: number;
  serviceHotelCharge: number;
  internationalCharge: number;
}
export interface creditRequestType {
  name: string;
  role: string;
  roleName: string;
  customer_id: string;
}

export interface companyType {
  id: number;
  company_name: string;
  company_address_line1: string;
  company_address_line2: string;
  phone_number: string;
  payment_method: string;
  cash_limits: cashLimitType;
  gst_details: gstDetailType;
  service_charges: serviceChargeType;
  markup_charges: markupChargeType;
  city: string;
  country_name: string;
  country_code: string;
  status: boolean;
  company_email: string;
  company_type: string;
  agency_id: number;
  company_logo: string;
  permissions: string;
  consolidator: consolidatorType[];
  credit_req: creditRequestType[];
  PCC: string;
  queue_number: string;
  target_branch: string;
  vendor_type: string;
  pincode: string;
  pan_number: string;
  invoice_prefix: string;
  expense: string;
  rights_to_book: boolean;
  travel_type: string;
  leg: string;
  need_approval: string;
  tm_credit_online: number;
  outsource_to_tripmidas: string;
  createdAt: string;
  updatedAt: string;
  Users: UserType[];
}

export interface AgencyType {}
