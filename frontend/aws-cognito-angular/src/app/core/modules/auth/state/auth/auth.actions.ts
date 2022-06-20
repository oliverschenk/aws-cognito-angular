import { createAction, props } from '@ngrx/store';
import {
  ChangePasswordInput,
  ConfirmPasswordResetInput,
  ConfirmSignUpInput,
  ResendConfirationCodeInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from './auth.models';

export const loadAuthenticatedState = createAction(
  '[Auth] Load authenticated state'
);

export const authenticatedStateLoaded = createAction(
  '[Auth] Authenticated state loaded',
  props<{ isLoggedIn: boolean }>()
);

export const signIn = createAction(
  '[Auth] Sign in',
  props<{ signInInput: SignInInput }>()
);

export const signInSuccessful = createAction('[Auth] Signed in successfully');

export const signInFailed = createAction(
  '[Auth] Sign in failed',
  props<{ errorMessage: any }>()
);

export const signOut = createAction('[Auth] Sign out');

export const signedOut = createAction('[Auth] Signed out');

export const signUp = createAction(
  '[Auth] Sign up',
  props<{ signUpInput: SignUpInput }>()
);

export const signUpSuccessful = createAction(
  '[Auth] Signed up successfully',
  props<{ username: string }>()
);

export const signUpFailed = createAction(
  '[Auth] Sign up failed',
  props<{ errorMessage: any }>()
);

export const changePassword = createAction(
  '[Auth] Change password',
  props<{ changePasswordInput: ChangePasswordInput }>()
);

export const changePasswordSuccessful = createAction(
  '[Auth] Changed password successfully'
);

export const changePasswordFailed = createAction(
  '[Auth] Changing password failed',
  props<{ errorMessage: any }>()
);

export const resetPassword = createAction(
  '[Auth] Request password reset',
  props<{ resetPasswordInput: ResetPasswordInput }>()
);

export const resetPasswordSuccessful = createAction(
  '[Auth] Password reset request succeeded',
  props<{ username: string }>()
);

export const resetPasswordFailed = createAction(
  '[Auth] Password reset request failed',
  props<{ errorMessage: any }>()
);

export const confirmResetPassword = createAction(
  '[Auth] Confirm password reset',
  props<{ confirmPasswordResetInput: ConfirmPasswordResetInput }>()
);

export const confirmResetPasswordSuccessful = createAction(
  '[Auth] Confirm password reset successfully'
);

export const confirmResetPasswordFailed = createAction(
  '[Auth] Confirm password reset failed',
  props<{ errorMessage: any }>()
);

export const confirmSignUp = createAction(
  '[Auth] Confirm sign-up reset',
  props<{ confirmSignUpInput: ConfirmSignUpInput }>()
);

export const confirmSignUpSuccessful = createAction(
  '[Auth] Confirm sign-up succeeded'
);

export const confirmSignUpFailed = createAction(
  '[Auth] Confirm sign-up failed',
  props<{ errorMessage: any }>()
);

export const resendConfirmationCode = createAction(
  '[Auth] Resend confirmation code',
  props<{ resendConfirmationCodeInput: ResendConfirationCodeInput }>()
);
