import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GetAllEmployeesApiResponse } from '../responses/getAllEmployees-api-response.model';
import { environment } from '@env/environment';
import { EmployeeApiRequest } from '../requests/employee-api-request.model';
import { Employee } from '../models/employee.model';
import { GetEmployeeByIdApiResponse } from '../responses/getEmployeeById-api-response.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    private apiUrl = `${environment.apiUrl}/Employees`;
    constructor(private http: HttpClient) {}

    getEmployees(request: EmployeeApiRequest): Observable<GetAllEmployeesApiResponse> {
      return this.http.post<GetAllEmployeesApiResponse>(
        `${this.apiUrl}/GetAllEmployees`,
        request
      ).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
    }

    createEmployee(request: Employee): Observable<string> {
      return this.http.post<string>(
        `${this.apiUrl}/`,
        request
      ).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
    }

    updateEmployee(request: Employee): Observable<string> {
      return this.http.put<string>(
        `${this.apiUrl}/`,
        request
      ).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
    }

    deleteEmployee(id: string): Observable<void> 
    {
      const options = {
        body: { id: id }, // Send ID in the request body
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      return this.http.delete<void>(this.apiUrl , options).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
    }

    getEmployeeById(id: string): Observable<GetEmployeeByIdApiResponse>
    {
      return this.http.get<GetEmployeeByIdApiResponse>(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
    }
}