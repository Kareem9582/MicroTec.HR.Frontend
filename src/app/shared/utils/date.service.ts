// src/app/shared/utils/age-calculator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class DateService{
    formatDateForInput(date: Date | string): string {
        // Handle both string and Date objects
        const d = new Date(date);
        return d.toISOString().split('T')[0];  // Returns "YYYY-MM-DD"
      }
}