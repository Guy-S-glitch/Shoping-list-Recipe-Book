import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../../../Models/recipe.model';
import * as fromAction from './recipe.action';

export interface State {
  recipes: Recipe[];
}
const initialState: State = {
  recipes: [],
};
export const recipeReducer = createReducer(
  initialState,
  on(fromAction.SET_RECIPES, (state, action) => ({
    ...state,
    recipes: [...action.recipes],
  })),
  on(fromAction.FETCH_RECIPES, (state) => ({
    ...state,
  })),
  on(fromAction.ADD_RECIPE, (state, action) => ({
    ...state,
    recipes: [...state.recipes, action.recipe],
  })),
  on(fromAction.UPDATE_RECIPE, (state, action) => {
    const updatedRecipes: Recipe[] = [...state.recipes];
    const updatedRecipe: Recipe = {
      ...state.recipes[action.index],
      ...action.recipe,
    };
    updatedRecipes[action.index] = updatedRecipe;
    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(fromAction.REMOVE_RECIPE, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter((ig, igIndex) => {
        return action.index !== igIndex;
      }),
    };
  })
);
