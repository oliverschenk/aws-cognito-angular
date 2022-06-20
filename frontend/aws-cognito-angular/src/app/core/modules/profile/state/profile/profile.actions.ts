import { createAction, props } from '@ngrx/store';
import { UserProfile } from './profile.models';

export const loadUserProfile = createAction('[Profile] Load user profile');

export const userProfileLoaded = createAction(
  '[Profile] User profile loaded',
  props<{ profile: UserProfile }>()
);

export const userProfileLoadFailed = createAction(
  '[Profile] User profile load failed',
  props<{ errorMessage: any }>()
);

export const saveUserProfile = createAction(
  '[Profile] Save user profile',
  props<{ profile: UserProfile }>()
);

export const userProfileSaved = createAction(
  '[Profile] User profile saved',
  props<{ profile: UserProfile }>()
);

export const userProfileSaveFailed = createAction(
  '[Profile] User profile save failed',
  props<{ errorMessage: any }>()
);
