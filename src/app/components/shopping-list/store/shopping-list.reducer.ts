import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../../Models/ingredient.model';
import { ADD_INGREDIENT, ADD_INGREDIENTS } from './shopping-list.action';

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
//   on(ADD_INGREDIENTS, (state, action) => ({
//     ...state,
//     ingredients: [...state.ingredients, action.ingredient],
//   }))
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
