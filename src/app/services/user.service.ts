import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Mentor } from '../Model/Mentor';
import { Skill } from '../Model/Skill';
import { MentorDTO } from '../Model/MentorDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url: string = environment.baseUrl + 'user-service';
  url: string = environment.baseUrl;

  userType: string;
  isMentor: boolean;
  mentorDTO: MentorDTO = null;
  constructor(private router: Router, private _httpClient: HttpClient) { }

  addUser(user: User): Observable<any> {
    console.log("Inside add user of service ")
    console.log(user)
    return this._httpClient.post<any>(this.url + "/signUp", user)
  }

  addMentor(): Observable<any> {
    return this._httpClient.post<any>(this.url + "/Mentor", this.mentorDTO)
  }

  getAllSkills(): Observable<any> {
    return this._httpClient.get<any>(this.url + "/skills")
  }

  setSkill(skills: Skill[]): Observable<any> {
    return this._httpClient.post<any>(this.url + "/addSkill", skills)
  }
}
