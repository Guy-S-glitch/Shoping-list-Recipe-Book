import { ShoppingService } from './../../../services/shopping.service';
import { RecipesService } from '../../../services/recipes.service';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { recipeModel } from '../../../Models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  GetSelectedItem: recipeModel;

  id: number;
  private sub: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private shoppingService: ShoppingService
  ) {}
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.GetSelectedItem = this.recipesService.GetRecipes()[this.id];
    });
  }
  SendToIngredients() {
    this.shoppingService.AddIngredientsFromShoppingList(
      this.GetSelectedItem.GetIngrediets()
    );
  }
  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
