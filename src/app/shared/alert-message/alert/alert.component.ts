import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor() {}
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  closeAlert() {
    this.close.emit();
  }
}