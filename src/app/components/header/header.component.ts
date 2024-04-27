import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-state/app-state.reducer';
import { map } from 'rxjs/operators';
import * as fromAction from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLoggedIn = false;
  subUser: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}
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
  onLogOut() {
    this.store.dispatch(fromAction.LOG_OUT())
  }
  ngOnInit(): void {
    this.subUser = this.store
      .select('auth')
      .pipe(
        map((auth) => {
          return auth.user;
        })
      )
      .subscribe((user) => {
        this.isLoggedIn = !!user;
      });
  }
  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
