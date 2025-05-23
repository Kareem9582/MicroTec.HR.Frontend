import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { DepartmentComponent } from './features/hr/department/department.component';

export const routes: Routes = [
    { 
        path: 'hr', loadChildren: () => import('./features/hr/hr.module').then(r => r.HrModule),
        providers: [provideHttpClient()] // HTTP client for HR domain
      },
      { path: 'departments', component: DepartmentComponent },

      { path: '', redirectTo: 'hr', pathMatch: 'full' },
      { path: '**', redirectTo: 'hr' } // Fallback route
    
];
