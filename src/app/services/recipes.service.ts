import { EventEmitter, Injectable } from '@angular/core';
import { recipeModel } from '../Models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor() {}
  private recipes: recipeModel[] = [
    new recipeModel(
      'Snitzelim',
      'goood',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKIfkDVw9KqcWp0DPYCDhl4GA98hRqfDf1WQenMbvif6OUZtHVdxwM-O1aFcZowmbdCg&usqp=CAU'
    ),
  ];
  GetRecipes() {
    return this.recipes.slice();
  }
  selectedItem = new EventEmitter<recipeModel>();
}
