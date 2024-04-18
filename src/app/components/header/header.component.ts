import { Subscription } from 'rxjs';
import { DataStorageService } from './../../services/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}
  onSave() {
    this.dataStorageService.saveData();
  }
  onFetch() {
    this.dataStorageService.fetchData();
  }
}
