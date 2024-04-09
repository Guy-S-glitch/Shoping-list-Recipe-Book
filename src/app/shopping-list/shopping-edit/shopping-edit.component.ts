import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ingredients } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredient = new EventEmitter<ingredients>();
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  sendIngredient: ingredients;
  AddIngredient() {
    this.sendIngredient = new ingredients(this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value);
    this.newIngredient.emit(this.sendIngredient);  
  }
  ngOnInit(): void {

  }
}
