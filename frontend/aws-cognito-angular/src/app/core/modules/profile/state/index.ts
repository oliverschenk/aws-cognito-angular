import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { UserProfile } from './profile';

import { userProfileReducer } from './profile/profile.reducer';

import { ProfileEffects } from './profile/profile.effects';
import { PageState } from './page';
import { pageReducer } from './page/page.reducer';

export interface ProfileModuleState {
  page: PageState;
  profile: UserProfile;
}

export const reducers: ActionReducerMap<ProfileModuleState> = {
  page: pageReducer,
  profile: userProfileReducer,
};

export const EFFECTS = [ProfileEffects];
