import { createReducer, on } from '@ngrx/store';
import { User } from '../../../Models/user.model';
import { LOG_IN, LOG_OUT } from './auth.action';

export interface State {
  user: User;
}
const initialState: State = null;
export const authReducer = createReducer(
  initialState,
  on(LOG_IN, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(LOG_OUT, (state) => ({
    ...state,
    user: null,
  }))
);
