import { ShoppingService } from '../../../services/shopping.service';
import { Component, OnInit } from '@angular/core';
import { ingredients } from '../../../Models/ingredients.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit {
  sendIngredient: ingredients;
  constructor(private shoppingService: ShoppingService) {}
  AddIngredient(form: NgForm) {
    this.shoppingService.AddIngredient(
      new ingredients(form.value.name, form.value.amount)
    );
  }
  ngOnInit(): void {}
}
