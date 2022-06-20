import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileModuleState } from '..';
import { UserProfile } from './profile.models';

export const selectProfileModuleState =
  createFeatureSelector<ProfileModuleState>('profileModule');

export const selectUserProfile = createSelector(
  selectProfileModuleState,
  (profileState: ProfileModuleState) => profileState.profile
);

export const selectProfileIsLoaded = createSelector(
  selectUserProfile,
  (profile: UserProfile) => profile && !!profile.phoneNumber
);
