import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Exercise[];
  @Output() trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.availableExercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }

}
