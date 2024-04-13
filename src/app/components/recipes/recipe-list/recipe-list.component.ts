import { RecipesService } from '../../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { recipeModel } from '../../../Models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: recipeModel[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}
  ngOnInit() {
    this.recipes = this.recipesService.GetRecipes();
  }
  newRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
