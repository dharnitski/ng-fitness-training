import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Exercise, ExerciseValues } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

const AVAILABLE_EXERCISES_COLLECTION = 'availableExercises';
const FINISHED_EXERCISES_COLLECTION = 'finishedExercises';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise = null;

  /** current training */
  exerciseChanged = new Subject<Exercise>();
  /** available trainings */
  exercisesChanged = new Subject<Exercise[]>();
  /** cancelled and completed exercises */
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubs: Subscription[] = [];


  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>) { }


  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db.collection(AVAILABLE_EXERCISES_COLLECTION)
        .snapshotChanges().pipe(
          map(docArray => {
            return docArray.map(doc => {
              const values = doc.payload.doc.data() as ExerciseValues;
              const id = doc.payload.doc.id;
              return { id, ...values };
            });
          })
          // subscription managed by framework, no need to unsubscribe
        ).subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          this.store.dispatch(new UI.StopLoading());
        }, error => {
          this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
          this.store.dispatch(new UI.StopLoading());
          console.error(error);
        })
    );
  }

  startExercise(selectedId: string) {
    this.db.doc(AVAILABLE_EXERCISES_COLLECTION + '/' + selectedId).update({ lastSelected: new Date() });
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  /**
   * Ending up exercise without full completion
   * @param progress is in range from 0 to 100
   */
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCanceledExercises() {
    this.fbSubs.push(
      this.db.collection(FINISHED_EXERCISES_COLLECTION)
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        }, error => {
          console.error(error);
        })
    );
  }

  cancelFBSubscriptions() {
    this.fbSubs.forEach(s => s.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    // todo: handle errors
    this.db.collection(FINISHED_EXERCISES_COLLECTION).add(exercise);
  }
}
