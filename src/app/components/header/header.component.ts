import { Subscription } from 'rxjs';
import { DataStorageService } from './../../services/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  sub: Subscription;
  constructor(private dataStorageService: DataStorageService) {}
  onSave() {
    console.log('aaa');
    
    this.sub = this.dataStorageService.saveData().subscribe((response) => {
      console.log(response);
    });
  }
}
