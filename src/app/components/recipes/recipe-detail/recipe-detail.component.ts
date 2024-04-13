import { ShoppingService } from './../../../services/shopping.service';
import { RecipesService } from '../../../services/recipes.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { recipeModel } from '../../../Models/recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  GetSelectedItem: recipeModel;
  private recipesService: RecipesService;
  private shoppingService: ShoppingService;
  id: number;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.recipesService = inject(RecipesService);
    this.shoppingService = inject(ShoppingService);
  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.GetSelectedItem = this.recipesService.GetRecipes()[this.id];
    });
  }
  SendToIngredients() {
    this.shoppingService.AddIngredientsFromShoppingList(
      this.GetSelectedItem.GetIngrediets()
    );
  }
  editRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
}
