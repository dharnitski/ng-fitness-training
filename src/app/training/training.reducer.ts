import { createFeatureSelector, createSelector, createReducer, on, Action } from '@ngrx/store';

// for module lazy loading
import * as fromRoot from '../app.reducer';
import { Exercise } from './exercise.model';
import { setAvailableTrainings, setFinishedTrainings, startTraining, stopTraining } from './training.actions';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

const reducer = createReducer(initialState,
  on(setAvailableTrainings, (state, { payload }) => ({ ...state, availableExercises: payload })),
  on(setFinishedTrainings, (state, { payload }) => ({ ...state, finishedExercises: payload })),
  on(startTraining, (state, { payload }) => ({
    ...state, activeTraining: {
      ...state.availableExercises
        .find(ex => ex.id === payload)
    }
  })),
  on(stopTraining, state => ({ ...state, activeTraining: null }))
);

// The exported reducer function is necessary as function calls are not supported by the AOT compiler.
export function trainingReducer(state: TrainingState | undefined, action: Action) {
  return reducer(state, action);
}

export const getTrainingStore = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingStore, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingStore, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingStore, (state: TrainingState) => state.activeTraining);
export const getIsActiveTraining = createSelector(getTrainingStore, (state: TrainingState) => state.activeTraining != null);

