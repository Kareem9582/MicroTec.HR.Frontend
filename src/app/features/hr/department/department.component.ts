import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './services/department.service';
import { DeleteDepartmentRequest, Department } from './interface/IDepartment';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GetAllDepartmentApiResponse } from './interface/GetAllDepartmentsApiResponse';
import { CsvExportService } from '@shared/utils/csv-export.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentApiRequest } from './interface/department-api-request.module';
import { AssetType } from '@core/models/ui/enums/asset-type';
import { ActionButton } from '@core/models/ui/models/action-button.model';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { ActionBarComponent } from '@shared/components/action-bar/action-bar.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { AssetsService } from '@core/services/assets.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  imports: [
    CommonModule, FormsModule, RouterModule,
    BreadcrumbComponent, SearchBarComponent,
    ActionBarComponent, LoadingSpinnerComponent  ,
     PaginationComponent
  ],
  providers: [DepartmentService]
})
  export class DepartmentComponent implements OnInit {
 
  departments: Department[] = [];
  actionButtons!: ActionButton[];
  selectedDepartment: Department = { depCode: '', name: '', valid: false };
  isLoading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  showAddForm = false;
  isEditing = false;
  showDeleteConfirm = false;
  departmentToDelete: string = '';
    tableHeaders: string[] = ['Department Code', 'Department Name'];
  pageTitle = 'Department Management';
  breadcrumbItems = [
    { label: 'HR Module', url: '/hr' },
    { label: 'Master Data', url: '/hr/departments' },
    { label: 'Department List View', isActive: true }
  ];

  constructor(private departmentService: DepartmentService, 
    private snackBar: MatSnackBar ,
   private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.isLoading = true;
    const request = { pageNumber: this.currentPage, pageSize: this.pageSize, searchTerm: this.searchTerm };
    this.departmentService.getDepartments(request).subscribe({
      next: (response) => {
        this.departments = response.items;
        this.totalItems = response.totalCount;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.isEditing = false;
    this.selectedDepartment = {id:'' , depCode: '', name: '', valid: false };
  }

  editDepartment(department: Department) {
    this.selectedDepartment = { ...department };
    this.showAddForm = true;
    this.isEditing = true;
  }

  saveDepartment() {
    if (this.isEditing) {
      this.departmentService.updateDepartment(this.selectedDepartment).subscribe(() => {
        this.getDepartments();
        this.showAddForm = false;
      });
    } else {
      this.departmentService.createDepartment(this.selectedDepartment).subscribe(() => {
        this.getDepartments();
        this.showAddForm = false;
      });
    }
  }
 
  confirmDelete(departmentId: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: { name: 'this department' }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.deleteDepartment(departmentId);
    }
  });
}

//-----------------
 deleteDepartment(departmentId: string) {
    this.departmentService.deleteDepartment(departmentId).subscribe({
      next: () => {
        this.getDepartments(); // Refresh the list after deletion
        this.snackBar.open('Department deleted successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error(`Error deleting department:`, err);
        this.snackBar.open('Error deleting department', 'Close', { duration: 3000 });
      }
    });
  }




//----------------------

  onSearch(term: string) {
    this.searchTerm = term;
    this.currentPage = 1; // Reset to first page when searching
    this.getDepartments();
  }
 //------------------

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.departmentToDelete = '';
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getDepartments();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.getDepartments();
  }


  //--------------

}