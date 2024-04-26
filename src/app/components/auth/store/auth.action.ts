import { createAction, props } from '@ngrx/store';
import { User } from '../../../Models/user.model';

export const LOG_IN_START = createAction(
  '[auth] Log in start',
  props<{ email: string; password: string }>()
);
export const LOG_IN_FAIL = createAction(
  '[auth] Log in failed',
  props<{ errorMessage: string }>()
);
export const LOG_IN = createAction('[auth] Log in', props<{ user: User }>());
export const LOG_OUT = createAction('[auth] Log out');
