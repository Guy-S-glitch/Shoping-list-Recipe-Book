import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from '../Models/recipe.model';
import { Ingredient } from '../Models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Snitzelim',
    //   'goood',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKIfkDVw9KqcWp0DPYCDhl4GA98hRqfDf1WQenMbvif6OUZtHVdxwM-O1aFcZowmbdCg&usqp=CAU',
    //   [new Ingredient('car', 1), new Ingredient('banana', 6)]
    // ),
    // new Recipe(
    //   'OTher shi',
    //   'goood',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKIfkDVw9KqcWp0DPYCDhl4GA98hRqfDf1WQenMbvif6OUZtHVdxwM-O1aFcZowmbdCg&usqp=CAU',
    //   [new Ingredient('car', 1), new Ingredient('banana', 6)]
    // ),
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
