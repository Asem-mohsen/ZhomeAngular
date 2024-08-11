export interface Sale {
    ID: number;
    ProductID: number;
    Amount: number;
    PriceAfter: number;
    StartDate: string;
    EndDate: string;
    created_at: string | null;
    updated_at: string;

}
