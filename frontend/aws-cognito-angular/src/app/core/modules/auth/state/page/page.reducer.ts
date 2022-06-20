import { createReducer, on } from '@ngrx/store';
import {
  signIn,
  signUp,
  signInSuccessful,
  signedOut,
  signInFailed,
  signUpFailed,
  signUpSuccessful,
  changePasswordSuccessful,
  changePasswordFailed,
  resetPasswordSuccessful,
  resetPasswordFailed,
  changePassword,
  resetPassword,
  confirmSignUp,
  confirmResetPassword,
  confirmResetPasswordSuccessful,
  confirmSignUpSuccessful,
  confirmResetPasswordFailed,
  confirmSignUpFailed,
} from '../auth/auth.actions';
import { resetPageState, showSuccessNotification } from './page.actions';
import { PageState } from './page.models';

export const initialState: PageState = {
  loading: false,
  notification: {
    show: false,
    message: '',
    colour: '',
  },
};

export const pageReducer = createReducer(
  initialState,
  on(
    signIn,
    signUp,
    confirmSignUp,
    changePassword,
    resetPassword,
    confirmResetPassword,
    (state) => ({
      ...state,
      loading: true,
      notification: {
        ...state.notification,
        show: false,
      },
    })
  ),
  on(
    signInSuccessful,
    signUpSuccessful,
    signedOut,
    confirmSignUpSuccessful,
    changePasswordSuccessful,
    resetPasswordSuccessful,
    confirmResetPasswordSuccessful,
    resetPageState,
    (state) => ({
      ...state,
      loading: false,
      notification: {
        ...state.notification,
        show: false,
      },
    })
  ),
  on(
    signInFailed,
    signUpFailed,
    changePasswordFailed,
    resetPasswordFailed,
    confirmResetPasswordFailed,
    confirmSignUpFailed,
    (state, { errorMessage }) => ({
      ...state,
      loading: false,
      notification: {
        show: true,
        colour: 'danger',
        message: errorMessage,
      },
    })
  ),
  on(showSuccessNotification, (state, { message }) => ({
    ...state,
    notification: {
      show: true,
      colour: 'success',
      message,
    },
  }))
);
