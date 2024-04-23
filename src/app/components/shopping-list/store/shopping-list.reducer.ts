import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../../Models/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  REMOVE_INGREDIENT,
  UPDATE_INGREDIENT,
} from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export const shoppingListReducer = createReducer(
  initialState,
  on(ADD_INGREDIENT, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  })),
  on(ADD_INGREDIENTS, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredient],
  })),
  on(UPDATE_INGREDIENT, (state, action) => {
    const ingredient = state.ingredients[action.index];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[action.index] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
    };
  }),
  on(REMOVE_INGREDIENT, (state, action) => ({
    ...state,
  }))
);

// Below code will not work yet, since we have not yet created the shopping list actions.
// But we can still see how the reducer will work (soon)
// export const shoppingListReducer = createReducer(
//   initialState,
//   on(ShoppingListActions.AddIngredient, (state, action) => ({ // will only work if ShoppingListActions.AddIngredient is an action created via createAction()
//     ...state,
//     ingredients: [...state.ingredients, action.ingredient]
//   })),
// );
