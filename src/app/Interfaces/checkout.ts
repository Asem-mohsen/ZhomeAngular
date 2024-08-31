import { Product } from "./product";
import { User } from "./user";

export interface CheckoutResponse {
  message: string;
  data: CheckoutData;
  error: any;
}

export interface CheckoutData {
  CartID: string;
  firstName: string;
  lastName: string;
  total: number;
  Orders: Order[];
  User: User;
}

export interface Order {
  ID: number;
  UserID: number;
  CartID: string;
  Name: string | null;
  Email: string | null;
  Phone: string | null;
  Address: string | null;
  City: string | null;
  Building: string | null;
  Floor: string | null;
  Apartment: string | null;
  Country: string | null;
  ProductID: number;
  Price: number;
  Quantity: number;
  WithInstallation: number;
  DeliveryFees: number | null;
  Total: number | null;
  PromoCodeID: number | null;
  Saving: number | null;
  TotalAfterSaving: number | null;
  Status: number;
  created_at: string;
  TransactionID: number | null;
  Location: string | null;
  SessionID: string | null;
  updated_at: string;
  ArchivedOn: string | null;
  DeletedOn: string | null;
  product: Product;
  transaction: Transaction | null;
  promocode: PromoCode | null;
}

export interface UserData {
  CartID: string;
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
  City: string;
  Building: string;
  Floor: string;
  Apartment: string;
  Country: string;
}

export interface Transaction {

}

export interface PromoCode {

}
