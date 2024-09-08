export interface Contact {
    ID: number;
    Name: string;
    Address: string;
    Location: string;
    Location2: string;
    Market: string;
    Market2: string;
    Phone: number;
    Phone2: number;
    Owner: string;
    NumberofEmp: number;
    WebsiteLink: string;
    OtherLinks: string | null;
    Redirecting: boolean;
    created_at: string;
    updated_at: string | null;
  }