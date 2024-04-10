import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { recipeModel } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit {
  @Input() item: recipeModel; 
  
  @Output() selectedItem = new EventEmitter<void>();
  SelectedItem() {
    this.selectedItem.emit();
  } 
  ngOnInit(): void {
    console.log(this.item);
  }
}
