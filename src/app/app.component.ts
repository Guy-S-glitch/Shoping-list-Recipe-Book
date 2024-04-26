import { Store } from '@ngrx/store';
import * as fromApp from './app-state/app-state.reducer';
import { Component, OnInit } from '@angular/core';
import { AUTO_LOGIN } from './components/auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(AUTO_LOGIN());
  }
}
