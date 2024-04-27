import { createAction, props } from '@ngrx/store';
import { User } from '../../../Models/user.model';

export const LOG_IN_START = createAction(
  '[auth] Log in start',
  props<{ email: string; password: string }>()
);
export const AUTHENTICATE_FAIL = createAction(
  '[auth] Authenticate failed',
  props<{ errorMessage: string }>()
);
export const AUTHENTICATE_SUCCESS = createAction(
  '[auth] Authenticate success',
  props<{ user: User; redirect: boolean }>()
);
export const LOG_OUT = createAction('[auth] Log out');
export const SIGN_UP_START = createAction(
  '[auth] Sign up',
  props<{ email: string; password: string }>()
);
export const CLEAN_ERROR = createAction('[auth] Clear error');
export const AUTO_LOGIN = createAction('[auth] Auto log in');
