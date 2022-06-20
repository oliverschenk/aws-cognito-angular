import { createAction, props } from '@ngrx/store';

export const resetPageState = createAction('[Profile Page] Reset page state');

export const showSuccessNotification = createAction(
  '[Profile Page] Show success notification',
  props<{ message: string }>()
);

export const showErrorNotification = createAction(
  '[Profile Page] Show error notification',
  props<{ message: string }>()
);
