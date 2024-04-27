import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromAction from './recipe.action';
import { map, switchMap, tap } from 'rxjs/operators';
import { Recipe } from '../../../Models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-state/app-state.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class recipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
  fetchRecipe = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAction.FETCH_RECIPES),
        switchMap(() => {
          return this.http.get<Recipe[]>(
            'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
          );
        }),
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        map((recipes) =>
          this.store.dispatch(fromAction.SET_RECIPES({ recipes }))
        )
      ),
    { dispatch: false }
  );
}
