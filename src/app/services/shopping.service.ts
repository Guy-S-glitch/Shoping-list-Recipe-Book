import { ingredients } from '../Models/ingredients.model';
import { ElementRef, EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
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
  }
}
