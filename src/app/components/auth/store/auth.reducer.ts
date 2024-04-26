import { createReducer, on } from '@ngrx/store';
import { User } from '../../../Models/user.model';
import * as fromAcrion from './auth.action';

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
  on(fromAcrion.AUTHENTICATE_SUCCESS, (state, action) => ({
    ...state,
    user: action.user,
    isLoading: false,
  })),
  on(fromAcrion.LOG_OUT, (state) => ({
    ...state,
    user: null,
    isLoading: false,
  })),
  on(fromAcrion.LOG_IN_START, fromAcrion.SIGN_UP_START, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
  })),
  on(fromAcrion.AUTHENTICATE_FAIL, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isLoading: false,
  })),
  on(fromAcrion.CLEAN_ERROR, (state) => ({
    ...state,
    errorMessage: null,
  }))
);
