import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthModuleState } from '..';
import { AuthState } from './auth.models';

export const selectAuthModuleState =
  createFeatureSelector<AuthModuleState>('authModule');

export const selectAuthState = createSelector(
  selectAuthModuleState,
  (state: AuthModuleState) => state.auth
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);
