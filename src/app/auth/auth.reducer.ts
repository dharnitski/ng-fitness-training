import { createReducer, on, Action } from '@ngrx/store';

import { setAuthenticated, setUnauthenticated } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

const reducer = createReducer(initialState,
  on(setAuthenticated, state => ({ ...state, isAuthenticated: true })),
  on(setUnauthenticated, state => ({ ...state, isAuthenticated: false }))
);

// The exported reducer function is necessary as function calls are not supported by the AOT compiler.
export function authReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}

export const getIsAuth = (state: State) => state.isAuthenticated;
