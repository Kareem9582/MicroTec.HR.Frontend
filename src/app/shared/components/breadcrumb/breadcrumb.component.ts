import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  host: {
    class: 'block bg-gray-50 py-4 border-b border-gray-200'
  }
})
export class BreadcrumbComponent {
  @Input() title = '';
  @Input() items: BreadcrumbItem[] = [];
  @Input() arrowIcon = 'assets/images/sub-header/arrow-icon.svg';
}