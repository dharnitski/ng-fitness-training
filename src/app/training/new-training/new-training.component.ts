import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Exercise, ExerciseValues } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises$: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.availableExercises$ = this.db
      .collection('availableExercises')
      .snapshotChanges().pipe(
        map(docArray => {
          return docArray.map(doc => {
            const values = doc.payload.doc.data() as ExerciseValues;
            const id = doc.payload.doc.id;
            return { id, ...values };
          });
        })
      );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
