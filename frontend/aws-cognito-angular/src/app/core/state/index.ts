import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface RootState {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<RootState> = {
  router: routerReducer,
};

export const metaReducers = [];

export const EFFECTS = [];
