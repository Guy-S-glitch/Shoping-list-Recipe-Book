import { OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { recipeModel } from '../../Models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit, OnDestroy {
  GetItemFromList: recipeModel;
  @Output() SendItemToDetail = new EventEmitter<recipeModel>();

  constructor() {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
