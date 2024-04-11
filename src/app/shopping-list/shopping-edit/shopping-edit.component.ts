import { ShoppingService } from '../../services/shopping.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { ingredients } from '../../Models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit {
  private shoppingService: ShoppingService;
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  sendIngredient: ingredients;
  constructor() {
    this.shoppingService = inject(ShoppingService);
  }
  AddIngredient() { 
    this.shoppingService.AddIngredient(this.nameInputRef, this.amountInputRef); 
  }
  ngOnInit(): void {}
}
