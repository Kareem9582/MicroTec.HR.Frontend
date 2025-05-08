import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-action-button',
  imports: [CommonModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss'
})
export class ActionButtonComponent {
  @Input() text : string = 'Action';
  @Input() iconUrl! : SafeResourceUrl;
  @Input() variant : string = 'primary';
  @Input() description : string = "description text";
  @Input() action!: () => void;

  handleClick() {
    this.action(); // Execute passed function
  }
}
