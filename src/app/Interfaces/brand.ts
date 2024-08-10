export interface Brand {
  ID:     number;
  Brand:  string;
  Logo:   string;
  CoverImg: string | null;
  MainDescription:   string;
  OtherDescription:  string;
  MainArabic: string;
  OtherArabicDescription: string | null;
  updated_at: string;
  created_at: string | null;
  ArchivedOn: string | null;
  DeletedOn:  string | null;
  products:   any[];
}

