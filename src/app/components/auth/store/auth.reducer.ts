import { createReducer, on } from '@ngrx/store';
import { User } from '../../../Models/user.model';
import { LOG_IN, LOG_IN_FAIL, LOG_IN_START, LOG_OUT } from './auth.action';

export interface State {
  user: User;
  errorMessage: string;
  isLoading: boolean;
}
const initialState: State = {
  user: null,
  errorMessage: null,
  isLoading: false,
};
export const authReducer = createReducer(
  initialState,
  on(LOG_IN, (state, action) => ({
    ...state,
    user: action.user,
    isLoading: false
  })),
  on(LOG_OUT, (state) => ({
    ...state,
    user: null,
    isLoading: false
  })),
  on(LOG_IN_START, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
  })),
  on(LOG_IN_FAIL, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isLoading: false,
  }))
);
