import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {
  exportToCsv(data: any[], filename: string): void {
    const csvData = this.convertToCsv(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private convertToCsv(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj)
        .map(value => this.escapeCsvValue(value))
        .join(',')
    );
    return [header, ...rows].join('\r\n');
  }

  private escapeCsvValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }
}