import { Component, EventEmitter, Output } from '@angular/core';
import { recipeModel } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  GetItemFromList: recipeModel;
  @Output() SendItemToDetail = new EventEmitter<recipeModel>();

}
