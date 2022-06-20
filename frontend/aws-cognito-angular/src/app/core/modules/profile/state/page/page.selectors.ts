import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileModuleState } from '..';
import { PageState } from './page.models';

export const selectProfileModuleState =
  createFeatureSelector<ProfileModuleState>('profileModule');

export const selectPageState = createSelector(
  selectProfileModuleState,
  (profileModuleState: ProfileModuleState) => profileModuleState.page
);

export const selectNotificationState = createSelector(
  selectPageState,
  (pageState: PageState) => pageState.notification
);
