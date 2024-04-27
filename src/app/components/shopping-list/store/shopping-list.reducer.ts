import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../../Models/ingredient.model';
import * as fromAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: Number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(fromAction.ADD_INGREDIENT, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  })),
  on(fromAction.ADD_INGREDIENTS, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredient],
  })),
  on(fromAction.UPDATE_INGREDIENT, (state, action) => {
    const ingredient = state.ingredients[+state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[+state.editedIngredientIndex] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(fromAction.REMOVE_INGREDIENT, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((ig, igIndex) => {
      return igIndex !== +state.editedIngredientIndex;
    }),
    editedIngredient: null,
    editedIngredientIndex: -1,
  })),
  on(fromAction.START_EDIT, (state, action) => ({
    ...state,
    editedIngredientIndex: action.index,
    editedIngredient: { ...state.ingredients[action.index] },
  })),
  on(fromAction.END_EDIT, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  }))
);
