import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert-message/alert/alert.component';
import { LoadingComponent } from './loading-spinner/loading/loading.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent, LoadingComponent, DropdownDirective],
  exports: [CommonModule, AlertComponent, LoadingComponent, DropdownDirective],
})
export class SharedModule {}
