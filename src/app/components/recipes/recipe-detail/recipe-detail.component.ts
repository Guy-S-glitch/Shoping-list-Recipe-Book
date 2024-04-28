import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../../Models/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app-state/app-state.reducer';
import { map, switchMap } from 'rxjs/operators';
import { REMOVE_RECIPE } from '../store/recipe.action';
import { ADD_INGREDIENTS } from '../../shopping-list/store/shopping-list.action';
import { state, style, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations:[
    // trigger('animate',[
    //   state('show',style({
        
    //   }))
    // ])
  ]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipe');
        }),
        map((recipeState) =>
          recipeState.recipes.find((recipe, index) => index === this.id)
        )
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      ADD_INGREDIENTS({ ingredient: this.recipe.ingredients })
    );
  }
  deleteRecipe() {
    this.store.dispatch(REMOVE_RECIPE({ index: this.id }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
