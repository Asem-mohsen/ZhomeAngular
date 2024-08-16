export interface Admin {
  id: number;
  Name: string;
  DOB: string;
  Phone: number;
  email: string;
  Address: string;
  RoleID: number;
  Active: number;
  IsAdmin: number;
  created_at: string | null;
  updated_at: string;
  Role: string;
}
export interface Role{
  ID: number;
  Role: string;
  updated_at: string;
  created_at: string | null;
}
