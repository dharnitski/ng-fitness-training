import { createAction, props } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const setAvailableTrainings = createAction(
  '[Training] Set Available Trainings',
  props<{ availableExercises: Exercise[] }>());
export const setFinishedTrainings = createAction(
  '[Training] Set Finished Trainings',
  props<{ finishedExercises: Exercise[] }>());
export const startTraining = createAction(
  '[Training] Start Training',
  props<{ exerciseId: string }>());
export const stopTraining = createAction('[Training] Stop Training');
