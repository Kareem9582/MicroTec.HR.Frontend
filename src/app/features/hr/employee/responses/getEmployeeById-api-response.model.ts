import { Custody } from "../models/custody.model";

export interface GetEmployeeByIdApiResponse {
  id: string;
  employeeCode: string;
  fullName: string;
  birthDate: Date;
  age?: number;
  nationalityId: string;
  gender: string;
  custodiesCount: number;
  custodies: Custody[];
  }