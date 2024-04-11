import { OnInit } from '@angular/core';
import { RecipesService } from './../services/recipes.service';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { recipeModel } from '../Models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  GetItemFromList: recipeModel;
  @Output() SendItemToDetail = new EventEmitter<recipeModel>();
  private recipesService: RecipesService;
  constructor() {
    this.recipesService = inject(RecipesService);
  }
  ngOnInit(): void {
    this.recipesService.selectedItem.subscribe((recipe: recipeModel) => {
      this.GetItemFromList = recipe;
    });  
  }
}
