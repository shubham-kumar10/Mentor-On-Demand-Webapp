import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MentorDTO } from '../Model/MentorDTO';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Skill } from '../Model/Skill';
import { HttpClient } from '@angular/common/http';
import { Mentor } from '../Model/Mentor';
import { MentorDetailsComponent } from '../mentor-details/mentor-details.component';
import { SkillDetails } from '../Model/SkillDetails';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  // searchUrl: string = environment.baseUrl + 'search-service';
  // mentorUrl: string = environment.baseUrl + 'mentor-service';

  searchUrl: string = environment.baseUrl;
  mentorUrl: string = environment.baseUrl;

  userType: string;
  isMentor: boolean;
  mentorDTO: MentorDTO = null;
  private subject = new Subject<SkillDetails[]>();

  constructor(private router: Router, private _httpClient: HttpClient) { }

  getSubject(): Subject<SkillDetails[]> {
    return this.subject;
  }

  getAllMentors(): Observable<any> {
    return this._httpClient.get<any>(this.searchUrl + "/mentors")
  }

  setMentorBySkill(id: number): Observable<any> {
    return this._httpClient.get<any>(this.searchUrl + "/mentorList" + id)
  }
}
