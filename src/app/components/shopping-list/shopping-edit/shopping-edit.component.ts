import { ShoppingService } from '../../../services/shopping.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ingredients } from '../../../Models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  sendIngredient: ingredients;
  constructor(private shoppingService: ShoppingService) {}
  AddIngredient() {
    this.shoppingService.AddIngredient(this.nameInputRef, this.amountInputRef);
  }
  ngOnInit(): void {}
}
