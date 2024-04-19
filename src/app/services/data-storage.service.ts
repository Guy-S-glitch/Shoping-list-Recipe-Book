import { Params } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../Models/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  saveData() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(
      'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      recipes
    );
  }
  fetchData() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user.token);

        return this.http.get<Recipe[]>(
          'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
          { params: new HttpParams().set('auth', user.token) }
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
      tap((response) => {
        this.recipeService.setRecipes(response);
      })
    );

    // return this.http
    //   .get<Recipe[]>(
    //     'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    //   )
    //   .pipe(
    //     map((recipes: Recipe[]) => {
    //       return recipes.map((recipe: Recipe) => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : [],
    //         };
    //       });
    //     }),
    //     tap((response) => {
    //       this.recipeService.setRecipes(response);
    //     })
    //   );
  }
}
