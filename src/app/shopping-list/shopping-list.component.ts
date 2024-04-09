import { Component, OnInit } from "@angular/core";
import { ingredients } from "../shared/ingredients.model";
@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrl: './shopping-list.component.css'
})
export class shoppingListComponent {
    ingredientList: ingredients[] = [
        new ingredients('apple', 5),
        new ingredients('banana', 10)
    ];
    constructor() { }
 
    addUserIngredient(UserIngredient:ingredients){ 
        this.ingredientList.push(UserIngredient);
    }
}