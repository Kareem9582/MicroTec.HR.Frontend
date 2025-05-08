import {  RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './employee/components/list-employee/list-employee.component';
import { NgModule } from '@angular/core';
import { CreateEmployeeComponent } from './employee/components/create-employee/create-employee.component';
import { ViewEmployeeComponent } from './employee/components/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './employee/components/update-employee/update-employee.component';

const hrRoutes: Routes = [
  { path: '', component: ListEmployeeComponent , title:"Employee Management"},
  { path: 'createEmployee', component: CreateEmployeeComponent , title:"Create Employee"},
  { path: 'view-employee/:id', component: ViewEmployeeComponent, title: "View Employee Details" },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent, title: "Update Employee" }
];

@NgModule({
  imports: [RouterModule.forChild(hrRoutes)],
  exports: [RouterModule]
})
export class HrRoutingModule {
  /**
   *
   */
 }