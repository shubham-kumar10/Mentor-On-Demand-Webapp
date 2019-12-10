import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../services/training.service';
import { Training } from '../Model/Training';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {

  trainingList: any;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.getTrainingData();

  }

  getTrainingData() {
    this.trainingService.getIncompleteTrainingObservable().subscribe(
      (data) => {
        this.trainingList = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  acceptRequest(training: Training) {
    training.status = "Accepted";
    this.trainingService.saveStatusChangedTraining(training).subscribe(
      (data) => {
        window.alert("Your Data has been added to the database");
        this.getTrainingData();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  declineRequest(training: Training) {
    training.status = "Denied";
    this.trainingService.saveStatusChangedTraining(training).subscribe(
      (data) => {
        window.alert("Your Data has been added to the database");
        this.getTrainingData();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
