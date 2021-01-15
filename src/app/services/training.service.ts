import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Training } from '../Model/Training';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Skill } from '../Model/Skill';
import { SkillDetails } from '../Model/SkillDetails';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // trainingURL: string = environment.baseUrl + "training-service/";
  trainingURL: string = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  sendTrainingRequest(training: Training): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.post(this.trainingURL + "/addTrainingRequest/", training, { headers });
  }

  getIncompleteTrainingObservable(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    console.log(this.trainingURL + "getIncompleteTraining/" + this.authService.username + "/");

    return this.http.get(this.trainingURL + "getIncompleteTraining/" + this.authService.username + "/", { headers });
  }

  saveStatusChangedTraining(training: Training): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.post(this.trainingURL + "editStatus/", training, { headers });
  }

  addMentorSkillAfterLogin(skill: SkillDetails): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    console.log(this.trainingURL + "addSkillLogin/")
    return this.http.post<SkillDetails>(this.trainingURL + "addSkillLogin/", skill, { headers });
  }
}
