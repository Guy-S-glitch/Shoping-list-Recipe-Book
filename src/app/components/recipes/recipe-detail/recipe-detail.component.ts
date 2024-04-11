import { ShoppingService } from './../../../services/shopping.service';
import { RecipesService } from '../../../services/recipes.service';
import { Component, Input, inject } from '@angular/core';
import { recipeModel } from '../../../Models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() GetSelectedItem: recipeModel;
  private recipesService: RecipesService;
  private shoppingService: ShoppingService;
  constructor() {
    this.recipesService = inject(RecipesService);
    this.shoppingService = inject(ShoppingService);
  }
  SendToIngredients() {
    this.shoppingService.AddIngredientsFromShoppingList(
      this.GetSelectedItem.GetIngrediets()
    );
  }
}
