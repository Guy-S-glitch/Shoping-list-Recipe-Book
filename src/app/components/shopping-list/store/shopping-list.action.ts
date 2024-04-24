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
export const REMOVE_INGREDIENT = createAction(
  '[Ingredient] Remove ingredient'
);
export const UPDATE_INGREDIENT = createAction(
  '[Ingredient] Update ingredient',
  props<{ ingredient: Ingredient}>()
);
export const START_EDIT = createAction(
  '[Ingredient] Start edit',
  props<{ index: number }>()
);
export const END_EDIT = createAction('[Ingredient] End edit');
