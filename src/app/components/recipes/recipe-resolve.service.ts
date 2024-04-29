import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../../Models/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-state/app-state.reducer';
import { SET_RECIPES } from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipe').pipe(
      take(1),
      map((recipeState) => recipeState.recipes),
      switchMap((recipe) => {
        if (recipe.length === 0) {
          return this.actions$.pipe(
            ofType(SET_RECIPES),
            take(1),
            map((resData) => resData.recipes)
          );
        } else {
          return of(recipe);
        }
      })
    );
  }
}
