export interface Custody {
    id?:string;
    custodyNumber?: string;
    custodyName: string;
    custodyDescription?: string; // Optional field
    assignDate: string; // Using string for date in YYYY-MM-DD format
  }