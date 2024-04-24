import { createReducer } from '@ngrx/store';
import { User } from '../../../Models/user.model';

export interface State {
  user: User;
}
const initialState:State = null;
export const authReducer = createReducer(
    initialState,
    
);
