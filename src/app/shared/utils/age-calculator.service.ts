// src/app/shared/utils/age-calculator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class AgeCalculatorService {
  
  calculateAge(birthDate: string | Date): string {
    if (!birthDate) return '';
    
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    
    // Basic validation
    if (isNaN(birthDateObj.getTime())) return '';
    if (birthDateObj > today) return 'Invalid date';

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age > 0 ? `${age} Years` : '0 Years';
  }
}