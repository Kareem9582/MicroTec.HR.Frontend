import { Custody } from "./custody.model";

export interface Employee {
    id?: string;
    employeeCode: string;
    fullName: string;
    birthDate: Date;
    age?: number;
    nationality: string;
    gender: 'Male' | 'Female' | 'Other';
    custodiesCount: number;
    custodies?:Custody[];
    valid:boolean;
  }