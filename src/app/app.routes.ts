import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'hr', loadChildren: () => import('./features/hr/hr.module').then(r => r.HrModule),
        providers: [provideHttpClient()] // HTTP client for HR domain
      },
      { path: '', redirectTo: 'hr', pathMatch: 'full' },
      { path: '**', redirectTo: 'hr' } // Fallback route
    
];
