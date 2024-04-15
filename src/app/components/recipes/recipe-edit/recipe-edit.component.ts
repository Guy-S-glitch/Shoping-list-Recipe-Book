import { ingredients } from './../../../Models/ingredients.model';
import { RecipesService } from './../../../services/recipes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  private sub: Subscription;
  form: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private recipesService: RecipesService
  ) {}
  onSubmit() {
    console.log(this.form);
  }
  ngOnInit() {
    this.sub = this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredientsArray = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipesService.GetRecipe(this.id);
      name = recipe.GetName();
      imagePath = recipe.GetPicturePath();
      description = recipe.GetDescription();
      if (recipe.GetIngrediets()) {
        for (let ingred of recipe.GetIngrediets()) {
          ingredientsArray.push(
            new FormGroup({
              name: new FormControl(ingred.GetName()),
              amount: new FormControl(ingred.GetAmount()),
            })
          );
        }
      }
    }
    this.form = new FormGroup({
      name: new FormControl(name),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
      ingredients: ingredientsArray,
    });
  }
  getEditIngredient() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
}
