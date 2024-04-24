import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from '../components/auth/store/auth.reducer';
import * as fromShoppingList from '../components/shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuthReducer.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuthReducer.authReducer,
};
