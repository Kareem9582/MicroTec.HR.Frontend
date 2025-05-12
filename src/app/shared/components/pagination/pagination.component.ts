import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule ], // Add any required imports here (CommonModule, FormsModule, etc.)
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
 
  /** Total number of items to paginate */
  @Input() totalItems: number = 0;

  /** Current active page (1-based index) */
  @Input() currentPage: number = 1;

  /** Number of items per page */
  @Input() itemsPerPage: number = 10;

  /** Available page size options */
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];

  /** Emits when page changes */
  @Output() pageChange = new EventEmitter<number>();

  /** Emits when items per page changes */
  @Output() itemsPerPageChange = new EventEmitter<number>();
  visiblePages: (number | string)[] = [];
  
  /**
   * Calculates total number of pages
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage) || 1;
  }

  /**
   * Handles page navigation
   * @param page The target page number
   */
  navigateToPage(page: number | string): void {
    if (typeof page === 'number' && 
        page >= 1 && 
        page <= this.totalPages && 
        page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  /**
   * Handles items per page change
   * @param newItemsPerPage The new items per page value
   */
  onItemsPerPageChange(newItemsPerPage: number): void {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 1; // Reset to first page when changing page size
    this.itemsPerPageChange.emit(newItemsPerPage);
    this.pageChange.emit(1);
  }

  getVisiblePages(): (number | string)[] {
    const visiblePages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    const range = 2; // How many pages to show around current page
  
    // Always show first page
    visiblePages.push(1);
  
    // Add range around current page
    let start = Math.max(2, current - range);
    let end = Math.min(total - 1, current + range);
  
    // Add ellipsis if needed
    if (start > 2) {
      visiblePages.push('...');
    }
  
    // Add page numbers in range
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }
  
    // Add ellipsis if needed
    if (end < total - 1) {
      visiblePages.push('...');
    }
  
    // Always show last page if different from first
    if (total > 1) {
      visiblePages.push(total);
    }
  
    return visiblePages;
  }
}