import { createReducer, on } from '@ngrx/store';
import { authenticatedStateLoaded } from '.';
import { signInSuccessful, signedOut } from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccessful, (state) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(signedOut, (state) => ({
    ...state,
    isLoggedIn: false,
  })),
  on(authenticatedStateLoaded, (state, { isLoggedIn }) => ({
    ...state,
    isLoggedIn,
  }))
);
