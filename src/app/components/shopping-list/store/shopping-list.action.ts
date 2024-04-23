import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../../Models/ingredient.model';

export const ADD_INGREDIENT = createAction(
  '[Ingredient] Add ingredient',
  props<{ ingredient: Ingredient }>()
);
export const ADD_INGREDIENTS = createAction(
  '[Ingredient] Add ingredients',
  props<{ ingredient: Ingredient[] }>()
);

