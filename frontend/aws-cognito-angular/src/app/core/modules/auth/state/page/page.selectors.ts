import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthModuleState } from '..';
import { PageState } from './page.models';

export const selectAuthModuleState =
  createFeatureSelector<AuthModuleState>('authModule');

export const selectPageState = createSelector(
  selectAuthModuleState,
  (authModuleState: AuthModuleState) => authModuleState.page
);

export const selectNotificationState = createSelector(
  selectPageState,
  (pageState: PageState) => pageState.notification
);
