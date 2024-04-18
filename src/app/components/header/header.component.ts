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
    this.dataStorageService.saveData().subscribe((data) => {
      console.log(data);
    });
  }
  onFetch() {
    this.dataStorageService.fetchData().subscribe((data) => {
      console.log(data);
    });
  }
}
