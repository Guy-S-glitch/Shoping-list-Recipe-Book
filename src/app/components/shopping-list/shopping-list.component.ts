import { ShoppingService } from '../../services/shopping.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ingredients } from '../../Models/ingredients.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class shoppingListComponent implements OnInit, OnDestroy {
  ingredientsList: ingredients[] = [];
  private sub: Subscription;
  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.ingredientsList = this.shoppingService.ingredientList;
    this.sub = this.shoppingService.IngredientEvent.subscribe(
      (ingredientsList: ingredients[]) => {
        this.ingredientsList = ingredientsList;
      }
    );
  }
  addUserIngredient(UserIngredient: ingredients) {
    this.shoppingService.addUserIngredient(UserIngredient);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
