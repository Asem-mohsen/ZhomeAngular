import { Product } from "./product";
import { User } from "./user";

export interface CheckoutResponse {
  message: string;
  data: CheckoutData;
  error: any;
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  total: number;
  Orders: Order[];
  User: User;
}

export interface Order {
  id: number;
  user_id: number;
  product_id: number;
  price: number;
  quantity: number;
  with_installation: number;
  total_amount: number;
  status: string;
  is_on_sale: string;
  transaction_id: string | null;
  session_id: string | null;
  product: Product;
  promocode: Promotion | null;
  created_at: string;
  updated_at: string;
}

export interface Promotion {
  id: number;
  code:string;
  valid_unti : string;
  valid_from : string;
  discount_amount : string;
}

export interface UserData{
  email : string;
  name : string;
  firstName : string;
  lastName : string;
  street_address : string;
  floor : string;
  apartment : string;
  phone : string[];
  building : string;
  city: string;
  country: string;
}
