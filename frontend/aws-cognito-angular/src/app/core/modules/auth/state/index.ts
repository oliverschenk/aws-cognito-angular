import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { authReducer } from './auth/auth.reducer';

import { AuthState } from './auth';
import { AuthEffects } from './auth/auth.effects';
import { PageState } from './page';
import { pageReducer } from './page/page.reducer';

export interface AuthModuleState {
  auth: AuthState;
  page: PageState;
}

export const reducers: ActionReducerMap<AuthModuleState> = {
  auth: authReducer,
  page: pageReducer
};

export const EFFECTS = [AuthEffects];
