import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Nationality } from '../models/nationality.model';

@Injectable({ providedIn: 'root' })
export class NationalityService {
    private apiUrl = `${environment.apiUrl}/Nationality`;
    constructor(private http: HttpClient) {}

    getNationalities(): Observable<Nationality[]> {
      return this.http.get<Nationality[]>(this.apiUrl).pipe(
        catchError(error => {
          console.error('API Error:', error);
          throw error;
        })
      );
}
}