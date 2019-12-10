import { Component, OnInit, Input } from '@angular/core';
import { Mentor } from '../Model/Mentor';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../Model/User';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SkillDetails } from '../Model/SkillDetails';
import { Training } from '../Model/Training';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() data: SkillDetails;
  constructor(private authService: AuthService, private userService: UserService, private formBuild: FormBuilder, private trainingService: TrainingService) { }

  ngOnInit() {
  }

  user: User
  trainingForm: FormGroup
  mentorId: number
  errorMessage: string = null
  requestTraining(mentorId: number) {
    this.authService.getUser().subscribe(
      data => {
        this.user = data
        console.log(data)
      }
    )
    this.mentorId = mentorId;
    this.trainingForm = this.formBuild.group({
      startDate: ['', [
        Validators.required,
        this.dateToday.bind(this),
        this.startAfterEnd.bind(this)
      ]],
      endDate: ['', [
        Validators.required,
        this.dateToday.bind(this),
        this.endBeforeStart.bind(this)
      ]]
    })
  }

  get startDate() {
    return this.trainingForm.get('startDate');
  }

  get endDate() {
    return this.trainingForm.get('endDate');
  }

  dateToday(formControl: FormControl): { [s: string]: boolean } {
    if (this.trainingForm) {
      if (formControl.value) {
        let date: Date = new Date(formControl.value);
        let currentDate = new Date();
        if (date < currentDate) {
          return { 'nomatch': true };
        }
      }
    }
    return null;
  }

  endBeforeStart(formControl: FormControl): { [s: string]: boolean } {
    if (this.trainingForm) {
      if (formControl.value) {
        let endDate: Date = new Date(formControl.value);
        let startdate = new Date(this.trainingForm.get('startDate').value);
        if (startdate > endDate) {
          return { 'nomatch1': true };
        }
      }
    }
    return null;
  }

  startAfterEnd(formControl: FormControl): { [s: string]: boolean } {
    if (this.trainingForm) {
      if (formControl.value) {
        let startdate: Date = new Date(formControl.value);
        let endDate = new Date(this.trainingForm.get('endDate').value);
        if (startdate > endDate) {
          return { 'nomatch1': true };
        }
      }
    }
    return null;
  }

  submitRequestTraining(formData: any, mentorSkill: SkillDetails) {
    let trainingDetails: Training = {
      id: null, mentor: mentorSkill.mentor, endDate: formData["endDate"], progress: 0, rating: null,
      skill: mentorSkill.skill, startDate: formData["startDate"], status: "Request Pending", user: this.user
    }
    this.trainingService.sendTrainingRequest(trainingDetails).subscribe(
      (data) => {
        window.alert("Your details are submitted successfully");
      },
      (error) => {
        console.log(error);
        if (error.error.message == "Start Date Coincides with an existing approved training of Mentor") {
          this.errorMessage = "Start Date Coincides with an existing approved training of Mentor";
        }
        else if (error.error.message == "End Date Coincides with an existing approved training of Mentor") {
          this.errorMessage = "End Date Coincides with an existing approved training of Mentor";
        }
        else if (error.error.message == "Start Date Coincides with an existing approved training of User") {
          this.errorMessage = "Start Date Coincides with an existing approved training of User";
        }
        else if (error.error.message == "End Date Coincides with an existing approved training of User") {
          this.errorMessage = "End Date Coincides with an existing approved training of User";
        }
      }
    )
  }
}
