import { RecipesService } from './../../../services/recipes.service';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { recipeModel } from '../../../Models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input() item: recipeModel; 
  private recipesService:RecipesService;
  constructor(){
    this.recipesService=inject(RecipesService);
  } 
  SelectedItem() {
    this.recipesService.selectedItem.emit(this.item); 
  } 
  ngOnInit(): void {
    // console.log(this.item);
  }
}
