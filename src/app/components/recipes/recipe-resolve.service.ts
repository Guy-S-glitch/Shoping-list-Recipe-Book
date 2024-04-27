import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../../Models/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-state/app-state.reducer';
import { FETCH_RECIPES, SET_RECIPES } from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(FETCH_RECIPES());
    return this.actions$.pipe(
      ofType(SET_RECIPES),
      take(1),
      map((resData) => resData.recipes)
    );
  }
}
