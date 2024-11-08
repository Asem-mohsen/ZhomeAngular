export interface Contact {
  id: number;
  title: string;
  tagline: string;
  meta_title: string;
  meta_description: string;
  phones: ContactPhones[];
  markets: ContactMarkets[];
  created_at: string;
  updated_at: string | null;
}

export interface ContactPhones {
  phone: string;
  created_at: string;
  updated_at: string | null;
}

export interface ContactMarkets {
  market: string;
  created_at: string;
  updated_at: string | null;
}
