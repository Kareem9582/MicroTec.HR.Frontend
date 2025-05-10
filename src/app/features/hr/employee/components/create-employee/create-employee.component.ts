import { Component } from "@angular/core";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { EmployeeFormComponent } from "../employee-form/employee-form.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "@hrfeatures/employee/services/employee.service";
import { Router } from "@angular/router";
import { Employee } from "@hrfeatures/employee/models/employee.model";
import { AppHeaderComponent } from "@shared/components/app-header/app-header.component";
import { LoadingSpinnerComponent } from "@shared/components/loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-employee',
  imports: [BreadcrumbComponent, EmployeeFormComponent, AppHeaderComponent, LoadingSpinnerComponent , CommonModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss', 
  standalone:true
})
export class CreateEmployeeComponent {
  employeeForm! : FormGroup;
  isLoading = false;
  pageTitle = 'Add New Employee';
  breadcrumbItems = [
    { label: 'HR Module', url: '/hr' },
    { label: 'Master Module', url: '/hr' },
    { label: 'Employee List View', url: '/hr' },
    { label: 'Add New Employee', isActive: true }
  ];
  
  constructor(
    private employeeService:EmployeeService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      this.initializeForm();
    }

  onCancel() {
      this.router.navigate(['/hr']);
    } 

  onSubmit(employee: Employee): void {
    this.isLoading = true;
    if (employee.valid) {
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          this.router.navigate(['/hr']);
        },
        error: (error) => {
          console.error('Creation failed:', error);
          this.snackBar.open('Failed to create employee', 'Close', {
            duration: 3000
          });
          this.isLoading = false;
        }
      });
    } else {
      //Blank for now
    }
    this.isLoading = false;
  }
  
  private initializeForm(): void {
      this.employeeForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.maxLength(100)]],
        birthDate: [null, [Validators.required]],
        nationality: ['', Validators.required],
        gender: ['', Validators.required]
      });

  }

}
