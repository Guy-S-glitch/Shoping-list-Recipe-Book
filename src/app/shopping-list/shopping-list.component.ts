import { ShoppingService } from '../services/shopping.service';
import { Component, OnInit, inject } from '@angular/core';
import { ingredients } from '../Models/ingredients.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class shoppingListComponent implements OnInit {
  ingredientsList: ingredients[] = [];
  private shoppingService: ShoppingService;
  constructor() {
    this.shoppingService = inject(ShoppingService);
  }
  ngOnInit(): void {
    this.ingredientsList = this.shoppingService.ingredientList;
  }
  addUserIngredient(UserIngredient: ingredients) {
    this.shoppingService.addUserIngredient(UserIngredient);
  }
}
