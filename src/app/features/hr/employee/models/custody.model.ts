export interface Custody {
    id?:string;
    custodyCode?: string;
    custodyName: string;
    custodyDescription?: string; // Optional field
    assignDate: string; // Using string for date in YYYY-MM-DD format
  }