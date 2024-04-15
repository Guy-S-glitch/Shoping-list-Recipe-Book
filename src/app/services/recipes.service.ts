import { Injectable } from '@angular/core';
import { recipeModel } from '../Models/recipe.model';
import { ingredients } from '../Models/ingredients.model';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor() {}
  private recipes: recipeModel[] = [
    new recipeModel(
      'Snitzelim',
      'goood',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKIfkDVw9KqcWp0DPYCDhl4GA98hRqfDf1WQenMbvif6OUZtHVdxwM-O1aFcZowmbdCg&usqp=CAU',
      [new ingredients('car', 1), new ingredients('banana', 6)]
    ),
    new recipeModel(
      'OTher shi',
      'goood',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKIfkDVw9KqcWp0DPYCDhl4GA98hRqfDf1WQenMbvif6OUZtHVdxwM-O1aFcZowmbdCg&usqp=CAU',
      [new ingredients('car', 1), new ingredients('banana', 6)]
    ),
  ];
  GetRecipes() {
    return this.recipes.slice();
  }
  GetRecipe(index: number) {
    return this.recipes[index];
  }
}
