import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  saveData() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(
      'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      recipes
    );
  }
}
