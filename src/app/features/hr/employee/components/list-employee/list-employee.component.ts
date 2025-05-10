import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from "@shared/components/app-header/app-header.component";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { SearchBarComponent } from "@shared/components/search-bar/search-bar.component";
import { ActionBarComponent } from "@shared/components/action-bar/action-bar.component";
import { ActionButton } from '@core/models/ui/models/action-button.model';
import { AssetsService } from '@core/services/assets.service';
import { AssetType } from '@core/models/ui/enums/asset-type';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { EmployeeService } from '@hrfeatures/employee/services/employee.service';
import { EmployeeApiRequest } from '@hrfeatures/employee/requests/employee-api-request.model';
import { Employee } from '@hrfeatures/employee/models/employee.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { GetEmployeeByIdApiResponse } from '@hrfeatures/employee/responses/getEmployeeById-api-response.model';
import { CsvExportService } from '@shared/utils/csv-export.service';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, BreadcrumbComponent, SearchBarComponent, ActionBarComponent, PaginationComponent , LoadingSpinnerComponent ],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent implements OnInit{
  actionButtons!: ActionButton[];
  employees: Employee[] = [];
  selectedEmployee! : GetEmployeeByIdApiResponse
  isLoading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 5;
  searchTerm = '';
  breadcrumbItems = [
    { label: 'HR Module', url: '/hr' },
    { label: 'Master Data', url: '/hr/employees' },
    { label: 'Employee List View', isActive: true }
  ];
  // Table Configuration
  tableHeaders = [
    'Employee Code',
    'Employee Name',
    'Birth Date',
    'Age',
    'Nationality',
    'Gender',
    'Number Of Custody',
    'Actions'
  ];
  pageTitle = 'Employee Management';
  /**
   *
   */
  constructor(
    private assetService: AssetsService, 
    private employeeService: EmployeeService ,
    private csvExportService:CsvExportService, 
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.prepairActionButtons();
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading = true;
    const request = this.getRequest();
    this.employeeService.
    getEmployees(request).
    subscribe({
      next: (response) => {
        this.employees = response.items;
        this.totalItems = response.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load employees', err);
        this.isLoading = false;
      }
    });
  }
  
  createEmployee(){
    this.router.navigate(['/hr/createEmployee']);
  }

  onEmployeeCreated(newEmployee: Employee): void {
    console.log('New employee created:', newEmployee);
    // Add to your employees array or call API service
  }
  // Update your ExportData method
  ExportData(): void {
    this.isLoading = true;

    if (this.employees.length === 0) {
      this.snackBar.open('No data to export', 'Close', { duration: 3000 });
      return;
    }

    try {
      // Prepare data for export
      const exportData = this.employees.map(employee => ({
        'Employee Code': employee.employeeCode,
        'Full Name': employee.fullName,
        'Birth Date': employee.birthDate,
        'Age': employee.age,
        'Nationality': employee.nationality,
        'Gender': employee.gender,
        'Custodies Count': employee.custodiesCount
      }));
    
        const filename = `employees_${new Date().toISOString().slice(0,10)}.csv`;
        this.csvExportService.exportToCsv(exportData, filename);
      } catch (error) {
        this.snackBar.open('Export failed', 'Close', { duration: 3000 });
        console.error('Export error:', error);
      } finally {
        this.isLoading = false;
    }
  }
  
  getRequest(): EmployeeApiRequest {
    return {
      pageNumber: this.currentPage,
      pageSize: this.pageSize, 
      searchTerm:this.searchTerm
    };
  }

  viewEmployee(id : string){
    this.router.navigate(['/hr/view-employee', id]);
  }

  editEmployee(id : string){
    this.router.navigate(['/hr/update-employee', id]);
  }

  deleteEmployee(employeeId: string, name: string): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.performDelete(employeeId);
      }
    });
  }

  private performDelete(employeeId: string): void {
    this.isLoading = true;
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.snackBar.open('Employee deleted successfully', 'Close', {
          duration: 3000
        });
        this.loadEmployees(); // Reload the list
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Error deleting employee', 'Close', {
          duration: 3000
        });
        console.error('Delete error:', err);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadEmployees();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.loadEmployees();
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reset to first page when searching
    this.loadEmployees();
  }

  prepairActionButtons(){
    this.actionButtons = [
      {
        text : "Export", 
        iconUrl : this.assetService.getAsset(AssetType.ICON , "export.svg"),
        discription : "Export Data to CSV", 
        variant : "secondary", 
        action : () => this.ExportData()
      },
      {
        text : "Add New", 
        iconUrl : this.assetService.getAsset(AssetType.ICON , "add-white.svg"), 
        discription : "Add New Employee", 
        variant : "primary" , 
        action : () => this.createEmployee()
      }
    ];
  }
}

