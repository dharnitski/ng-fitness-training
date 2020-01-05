import { startLoading, stopLoading } from './ui.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

const reducer = createReducer(initialState,
  on(startLoading, state => ({ ...state, isLoading: true })),
  on(stopLoading, state => ({ ...state, isLoading: false }))
);

// The exported reducer function is necessary as function calls are not supported by the AOT compiler.
export function uiReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}

export const getIsLoading = (state: State) => state.isLoading;
