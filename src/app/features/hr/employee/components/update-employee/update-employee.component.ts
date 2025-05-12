import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GetEmployeeByIdApiResponse } from '@hrfeatures/employee/responses/getEmployeeById-api-response.model';
import { EmployeeService } from '@hrfeatures/employee/services/employee.service';
import { LoadingSpinnerComponent } from "@shared/components/loading-spinner/loading-spinner.component";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { FormGroup } from '@angular/forms';
import { Employee } from '@hrfeatures/employee/models/employee.model';

@Component({
  selector: 'app-update-employee',
  imports: [CommonModule, LoadingSpinnerComponent, BreadcrumbComponent, EmployeeFormComponent],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss'
})

export class UpdateEmployeeComponent implements OnInit{
  employeeData! : GetEmployeeByIdApiResponse;
  isLoading = false;
  breadcrumbItems = [
    { label: 'HR Module', url: '/hr' },
    { label: 'Master Module', url: '/hr' },
    { label: 'Employee List View', url: '/hr' },
    { label: 'View Employee ', isActive: true }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id') ?? "";
    this.employeeService.getEmployeeById(id)
    .subscribe({
      next: (response) => {
        this.employeeData = response;
        this.updateBreadcrumb(response);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load employee', err);
        this.snackBar.open('Failed to load employee details', 'Close', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

onCancelClick() {
  this.router.navigate(['/hr']);
}

onUpdateClick(employee: Employee) {
  console.log(employee)
  this.isLoading = true;
      if (employee.valid) {
        this.employeeService.updateEmployee(employee).subscribe({
          next: () => {
            this.router.navigate(['/hr']);
          },
          error: (error) => {
            console.error('Update failed:', error);
            this.snackBar.open('Failed to update employee details', 'Close', {
              duration: 3000
            });
            this.isLoading = false;
          }
        });
      } else {
      }
      this.isLoading = false;
}
private updateBreadcrumb(employee: GetEmployeeByIdApiResponse): void {
  // Create a new array to avoid mutation issues
  this.breadcrumbItems = [
    ...this.breadcrumbItems.slice(0, -1), // Keep all items except last
    { 
      label: `Update Employee - ${employee.employeeCode}`, 
      isActive: true 
    }
  ];
}
}
