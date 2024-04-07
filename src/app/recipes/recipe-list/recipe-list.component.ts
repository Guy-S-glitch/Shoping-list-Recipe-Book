import { Component, OnInit } from '@angular/core';
import { recipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: recipeModel[] = [
    new recipeModel('Snitzelim', 'goood', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKIfkDVw9KqcWp0DPYCDhl4GA98hRqfDf1WQenMbvif6OUZtHVdxwM-O1aFcZowmbdCg&usqp=CAU')

  ];
  ngOnInit() {

  }
}
