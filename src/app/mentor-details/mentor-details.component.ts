import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Skill } from '../Model/Skill';
import { User } from '../Model/User';
import { Mentor } from '../Model/Mentor';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css']
})
export class MentorDetailsComponent implements OnInit {

  skillsForm: FormGroup
  mentorForm: FormGroup
  showLabel: boolean = false
  skills: Skill[]
  skillarray: any
  signUpDone: boolean
  isMentor: boolean
  ngOnInit() {
    this.userService.getAllSkills().subscribe(
      data => this.skills = data
    )

    this.mentorForm = this.formBuilder.group({
      linkedInUrl: ['', [
        Validators.required
      ]],
      yearsOfExperience: ['', [
        Validators.required
      ]]
    })
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.skillsForm = this.formBuilder.group({
      skill: this.formBuilder.array([]),
    });
    this.skill.push(this.formBuilder.group({
      skill_id: '',
      yearsOfExperience: '',
      self_rating: '',
    }))
  }

  get skillform() { return this.skillsForm.controls; }
  get skill() { return this.skillform.skill as FormArray; }

  addSkills() {
    this.skillarray = this.skill as FormArray;
    this.skillarray.push(this.formBuilder.group({
      skill_id: '',
      yearsOfExperience: '',
      self_rating: '',
    }))
    console.log(this.skillarray.value);
  }

  addMentorDetails() {
    this.userService.mentorDTO.mentor.linkedinUrl = this.mentorForm.value['linkedInUrl']
    this.userService.mentorDTO.mentor.yearsOfExperience = this.mentorForm.value['yearsOfExperience']
    this.userService.mentorDTO.skills = this.skillarray.value
    console.log(this.userService.mentorDTO)
    this.userService.addMentor().subscribe();
  }

}
