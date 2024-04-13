import { Component, Input, OnInit } from '@angular/core';
import { recipeModel } from '../../../../Models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  @Input() item: recipeModel;
  @Input() id: number;
  constructor() {}
  ngOnInit(): void {}
}
