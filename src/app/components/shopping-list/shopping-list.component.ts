import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../Models/ingredient.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { START_EDIT } from './store/shopping-list.action';
import * as fromApp from '../../app-state/app-state.reducer';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('ShoppingListAdd', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void=>*', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]),
      transition('*=>void', [
        animate(
          500,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
    ,
  ],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(START_EDIT({ index: index }));
  }

  ngOnDestroy() {}
}
