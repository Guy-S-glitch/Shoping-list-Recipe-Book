import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../Models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  saveData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchData() {
    this.http
      .get<Recipe[]>(
        'https://course-database-574ef-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .subscribe((response) => {
        this.recipeService.setRecipes(response);
        console.log(response);
        
      });
  }
}
