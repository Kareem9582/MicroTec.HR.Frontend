import { Component, Input, OnInit } from '@angular/core';
import { ActionButtonComponent } from "../action-button/action-button.component";
import { ActionButton } from '@core/models/ui/models/action-button.model';

@Component({
  selector: 'app-action-bar',
  imports: [ActionButtonComponent],
  templateUrl: './action-bar.component.html',
  styleUrl: './action-bar.component.scss'
})
export class ActionBarComponent {

  @Input() buttons! : ActionButton[];
}
