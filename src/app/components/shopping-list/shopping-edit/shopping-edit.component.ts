import { ShoppingService } from '../../../services/shopping.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ingredients } from '../../../Models/ingredients.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  sub: Subscription;
  editedItem: number;
  editedIngredient: ingredients;
  editMode = false;
  sendIngredient: ingredients;
  constructor(private shoppingService: ShoppingService) {}
  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingService.updateIngredients(
        this.editedItem,
        new ingredients(form.value.name, form.value.amount)
      );
    } else {
      this.shoppingService.AddIngredient(
        new ingredients(form.value.name, form.value.amount)
      );
    }
    this.onClear();
  }
  onClear() {
    this.form.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingService.removeIngedient(this.editedItem);  
    this.onClear();
  }
  ngOnInit(): void {
    this.sub = this.shoppingService.editedIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItem = index;
        this.editedIngredient = this.shoppingService.getIngredient(index);
        this.form.setValue({
          name: this.editedIngredient.GetName(),
          amount: this.editedIngredient.GetAmount(),
        }); 
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
