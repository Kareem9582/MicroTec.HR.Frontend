import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  standalone:true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Output() searchTermChanged = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  ngAfterViewInit() {
    // Listen to input events with debounce
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),  // Wait 300ms after last keystroke
        distinctUntilChanged()  // Only emit if value changed
      )
      .subscribe((text: string) => {
        if (text.length >= 3 || text.length === 0) {
          this.searchTermChanged.emit(text);
        }
      });
  }
}
