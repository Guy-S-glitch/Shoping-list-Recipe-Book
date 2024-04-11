import { RecipesService } from '../../services/recipes.service';
import { Component, Input, inject } from '@angular/core';
import { recipeModel } from '../../Models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() GetSelectedItem: recipeModel;
  private recipesService: RecipesService;
  constructor() {
    this.recipesService = inject(RecipesService);
  }
  
}
