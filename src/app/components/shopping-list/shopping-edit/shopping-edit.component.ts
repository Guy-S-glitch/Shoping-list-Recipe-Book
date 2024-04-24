import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../../Models/ingredient.model';
import { Store } from '@ngrx/store';
import {
  ADD_INGREDIENT,
  END_EDIT,
  REMOVE_INGREDIENT,
  UPDATE_INGREDIENT,
} from '../store/shopping-list.action';
import { AppState } from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex !== -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          console.log(stateData.editedIngredientIndex);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        UPDATE_INGREDIENT({
          ingredient: newIngredient,
        })
      );
    } else {
      this.store.dispatch(ADD_INGREDIENT({ ingredient: newIngredient }));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(END_EDIT());
  }

  onDelete() {
    this.store.dispatch(REMOVE_INGREDIENT());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(END_EDIT());
  }
}
