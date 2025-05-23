import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DepartmentApiRequest } from '../interface/department-api-request.module';
import { GetAllDepartmentApiResponse } from '../interface/GetAllDepartmentsApiResponse';
import { Department ,DeleteDepartmentRequest} from '../interface/IDepartment'; // Make sure this path is correct
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}/Department`;
   
  constructor(private http: HttpClient) { 
  
       
  }

//--Get All Departments
  
   getDepartments(request: DepartmentApiRequest): Observable<GetAllDepartmentApiResponse> {
        return this.http.post<GetAllDepartmentApiResponse>(
          `${this.apiUrl}/GetAllDepartments`,
          request
        ).pipe(
          catchError(error => {
            console.error('API Error:', error);
            throw error;
          })
        );
      }



  // Create a new department
   
  createDepartment(request: Department): Observable<string> {
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
  
  // Update an existing department
 

   updateDepartment(request: Department): Observable<string> {
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


  // Delete a department  
   
  //deleteDepartment(request: DeleteDepartmentRequest): Observable<void> {
  //  return this.http.delete<void>(`${this.apiUrl}/DeleteDepartment`, {
  //    body: request  
 //   });
 // }  
  // The above code is commented out because it was giving a 406 error.
  // The correct way to delete a department is to use the following method:
  
  // Delete a department by ID


    deleteDepartment(id: string): Observable<void> 
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




  // Get a department by ID
  getDepartmentById(id: string): Observable<Department> {  
    return this.http.get<Department>(`${this.apiUrl}/GetDepartmentById/${id}`)
      .pipe(
        tap(data => console.log('Department by ID:', JSON.stringify(data))),
        catchError(this.handleError<any>('getDepartmentById'))
      );
  }   
  // Handle HTTP operation that failed.
  // Let the app keep running by returning an empty result.
  // This could be a more complex error handling logic
  // depending on the application requirements.
  // For example, you might want to log the error to a remote server
  // or show a user-friendly message.
  // The `operation` parameter is used to identify the operation
  // that failed, and the `result` parameter is the default value
  // that will be returned in case of an error.
  // The `T` type parameter is used to specify the type of the result.
  // The `handleError` method returns a function that takes an error
  // object as an argument and returns an observable of type `T`. 
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Optionally, send the error to remote logging infrastructure
      // Return an observable with a safe result
      return new Observable<T>(observer => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }
}
