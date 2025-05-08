import { Employee } from "../models/employee.model";

export interface GetAllEmployeesApiResponse {
    items: Employee[];
    totalCount: number;
    page: number;
    pageSize: number;
  }