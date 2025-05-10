import { Component, OnInit } from '@angular/core';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { GetEmployeeByIdApiResponse } from '@hrfeatures/employee/responses/getEmployeeById-api-response.model';
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@hrfeatures/employee/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { AppHeaderComponent } from "@shared/components/app-header/app-header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-employee',
  imports: [EmployeeFormComponent, BreadcrumbComponent, LoadingSpinnerComponent, AppHeaderComponent, CommonModule],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})

export class ViewEmployeeComponent implements OnInit{
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

private updateBreadcrumb(employee: GetEmployeeByIdApiResponse): void {
  // Create a new array to avoid mutation issues
  this.breadcrumbItems = [
    ...this.breadcrumbItems.slice(0, -1), // Keep all items except last
    { 
      label: `View Employee - ${employee.employeeCode}`, 
      isActive: true 
    }
  ];

}
}
