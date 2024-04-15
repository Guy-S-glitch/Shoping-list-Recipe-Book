import { ingredients } from './../Models/ingredients.model';
import { Subject } from 'rxjs';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  IngredientEvent = new Subject<ingredients[]>();
  editedIngredient=new Subject<number>();
  constructor() {}
  ingredientList: ingredients[] = [
    new ingredients('apple', 5),
    new ingredients('banana', 10),
  ];
  addUserIngredient(UserIngredient: ingredients) {
    this.ingredientList.push(UserIngredient);
  }
  AddIngredient(ingredients: ingredients) {
    this.ingredientList.push(ingredients);
    this.IngredientEvent.next(this.ingredientList.slice());
  }
  AddIngredientsFromShoppingList(ingredients: ingredients[]) {
    this.ingredientList.push(...ingredients);
    this.IngredientEvent.next(this.ingredientList.slice());
  }
  getIngredient(index:number){
    return this.ingredientList[index];
  }
  updateIngredients(index:number,ingredient:ingredients){
    this.ingredientList[index]=ingredient;
    this.IngredientEvent.next(this.ingredientList.slice());
    console.log(this.ingredientList);
    
  }
}
