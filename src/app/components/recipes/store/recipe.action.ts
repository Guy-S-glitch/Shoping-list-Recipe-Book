import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../../Models/recipe.model';

export const SET_RECIPES = createAction(
  '[recipe] Set recipes',
  props<{ recipes: Recipe[] }>()
);

export const ADD_RECIPE = createAction(
  '[recipe] Add recipe',
  props<{ recipe: Recipe }>()
);
export const UPDATE_RECIPE = createAction(
  '[recipe] Update recipe',
  props<{ recipe: Recipe; index: number }>()
);
export const REMOVE_RECIPE = createAction(
  '[recipe] Delete recipe',
  props<{ index: number }>()
);
