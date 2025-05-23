import { Department } from "./IDepartment";

export interface GetAllDepartmentApiResponse {
    items: Department[];
    totalCount: number;
    page: number;
    pageSize: number;
  }