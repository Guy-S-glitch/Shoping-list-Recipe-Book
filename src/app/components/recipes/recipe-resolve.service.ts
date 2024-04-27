import { RecipeService } from './recipe.service';
import { DataStorageService } from '../header/data-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../../Models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolveService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.recipeService.getRecipes().length === 0
      ? this.dataStorageService.fetchData()
      : this.recipeService.getRecipes();
  }
}
