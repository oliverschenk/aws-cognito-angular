import { createReducer, on } from '@ngrx/store';
import {
  userProfileLoaded,
  userProfileSaved,
} from './profile.actions';
import { UserProfile } from './profile.models';

export const initialState: UserProfile = {
  phoneNumber: null,
  name: '',
  company: '',
  role: '',
};

export const userProfileReducer = createReducer(
  initialState,

  on(userProfileLoaded, userProfileSaved, (state, { profile }) => ({
    ...profile,
  }))
);
