export interface Platform {
  ID:     number;
  Platform:  string;
  Logo: string;
  VideoURL: string;
  CoverImg: string | null;
  MainDescription:   string;
  ArabicDescription: string;
  updated_at: string;
  created_at: string | null;
  ArchivedOn: string | null;
  DeletedOn:  string | null;
  products: any[];

}
