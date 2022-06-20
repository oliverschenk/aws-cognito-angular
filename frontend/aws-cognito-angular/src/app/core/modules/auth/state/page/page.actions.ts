import { createAction, props } from '@ngrx/store';

export const resetPageState = createAction('[Auth Page] Reset page state');

export const showSuccessNotification = createAction(
  '[Auth Page] Show success notification',
  props<{ message: string }>()
);
