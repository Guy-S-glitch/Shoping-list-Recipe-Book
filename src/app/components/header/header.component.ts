import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../Models/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-state/app-state.reducer';
import { map } from 'rxjs/operators';
import * as fromAuthAction from '../auth/store/auth.action';
import * as fromRecipeAction from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLoggedIn = false;
  subUser: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}
  onSave() {
    this.store.dispatch(fromRecipeAction.SAVE_RECIPES());
  }
  onFetch() {
    this.store.dispatch(fromRecipeAction.FETCH_RECIPES());
  }
  onLogOut() {
    this.store.dispatch(fromAuthAction.LOG_OUT());
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
