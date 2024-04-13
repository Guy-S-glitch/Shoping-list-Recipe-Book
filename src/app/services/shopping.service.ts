import { Subject } from 'rxjs';
import { ingredients } from '../Models/ingredients.model';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  IngredientEvent = new Subject<ingredients[]>();
  constructor() {}
  ingredientList: ingredients[] = [
    new ingredients('apple', 5),
    new ingredients('banana', 10),
  ];
  addUserIngredient(UserIngredient: ingredients) {
    this.ingredientList.push(UserIngredient);
  }
  AddIngredient(nameInputRef: ElementRef, amountInputRef: ElementRef) {
    this.ingredientList.push(
      new ingredients(
        nameInputRef.nativeElement.value,
        amountInputRef.nativeElement.value
      )
    );
    this.IngredientEvent.next(this.ingredientList);
  }
  AddIngredientsFromShoppingList(ingredients: ingredients[]) {
    this.ingredientList.push(...ingredients);
    this.IngredientEvent.next(this.ingredientList);
  }
}
