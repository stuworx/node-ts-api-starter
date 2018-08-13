import { Document } from "mongoose";


export interface ICustomers extends Document {
  name: string;
  email: string;
  regType?: string;
  gender?: string;
  address?: string;
  dob?: Date;
  phone: string;
  password?: string;
  isEnabled?: Boolean;
}
