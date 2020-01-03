import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }

  /**
   * Ending up exercise without full completion
   * @param progress is in range from 0 to 100
   */
  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    });
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
