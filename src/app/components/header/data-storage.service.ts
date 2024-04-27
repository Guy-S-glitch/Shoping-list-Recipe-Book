import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../../Models/recipe.model';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../../app-state/app-state.reducer';
import { Store } from '@ngrx/store';
import { SET_RECIPES } from '../recipes/store/recipe.action';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    // private recipeService: RecipeService,
    // private authService: AuthService
    private store: Store<fromApp.AppState>
  ) {}
  saveData() {
    const recipes = this.store
      .select('recipe')
      .pipe(map((resData) => resData.recipes));
    return this.http.put(
      'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      recipes
    );
  }
  fetchData() {
    return this.http
      .get<Recipe[]>(
        'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((response) => {
          this.store.dispatch(SET_RECIPES({ recipes: response }));
        })
      );
  }
}
