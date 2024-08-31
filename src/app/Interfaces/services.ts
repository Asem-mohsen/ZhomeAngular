export interface Services {
  ID: number ;
  Name: string; 
  ArabicName: string | null ;
  Description: string;
  ArabicDescription: string | null; 
  Image: string;
  ButtonText: string;
  Link: string;
  Duration: number;
  Price: number;
  Status: number;
  created_at: string | null;
  updated_at: string | null;
}
