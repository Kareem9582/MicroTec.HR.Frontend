// src/app/tasks/tasks.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrRoutingModule } from './hr-routing.module';
import { ListEmployeeComponent } from './employee/components/list-employee/list-employee.component';
import { CreateEmployeeComponent } from './employee/components/create-employee/create-employee.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee/components/employee-form/employee-form.component';
import { ViewEmployeeComponent } from './employee/components/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './employee/components/update-employee/update-employee.component';

@NgModule({
  imports: [
    CommonModule,
    HrRoutingModule,
    ListEmployeeComponent,
    CreateEmployeeComponent,
    EmployeeFormComponent,
    ViewEmployeeComponent,
    UpdateEmployeeComponent,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class HrModule { }