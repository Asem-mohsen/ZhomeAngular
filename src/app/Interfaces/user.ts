export interface User {
  id: number;
  google_id: string | null;
  FacebookID: string | null;
  session_id: string;
  Name: string;
  email: string;
  Status: number;
  Phone: number;
  Address: string;
  verification_code: string | null;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  remember_token: string | null;
  ArchivedOn: string | null;
  DeletedOn: string | null;
}

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
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user?: User;
    admin?: Admin;
  };
  error: any;
}
