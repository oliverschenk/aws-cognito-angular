import { createReducer, on } from '@ngrx/store';
import {
  saveUserProfile,
  userProfileSaved,
  userProfileSaveFailed,
} from '../profile';
import {
  resetPageState,
  showErrorNotification,
  showSuccessNotification,
} from './page.actions';
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
  on(saveUserProfile, (state) => ({
    ...state,
    loading: true,
    notification: {
      ...state.notification,
      show: false,
    },
  })),
  on(userProfileSaved, resetPageState, (state) => ({
    ...state,
    loading: false,
    notification: {
      ...state.notification,
      show: false,
    },
  })),
  on(userProfileSaveFailed, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    notification: {
      show: true,
      colour: 'danger',
      message: errorMessage,
    },
  })),
  on(showSuccessNotification, (state, { message }) => ({
    ...state,
    notification: {
      show: true,
      colour: 'success',
      message,
    },
  })),
  on(showErrorNotification, (state, { message }) => ({
    ...state,
    notification: {
      show: true,
      colour: 'danger',
      message,
    },
  }))
);
