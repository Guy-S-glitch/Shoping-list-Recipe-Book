import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit, inject } from '@angular/core';
import { recipeModel } from '../../Models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: recipeModel[];
  private recipesService: RecipesService;
  constructor() {
    this.recipesService = inject(RecipesService);
  }
  ngOnInit() {
    this.recipes = this.recipesService.GetRecipes();
  }
}
