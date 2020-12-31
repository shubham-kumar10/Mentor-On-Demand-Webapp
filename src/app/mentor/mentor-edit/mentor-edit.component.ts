import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from 'src/app/Model/Skill';
import { SkillService } from 'src/app/services/skill.service';
import { TrainingService } from 'src/app/services/training.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/Model/User';
import { SkillDetails } from 'src/app/Model/SkillDetails';

@Component({
  selector: 'app-mentor-edit',
  templateUrl: './mentor-edit.component.html',
  styleUrls: ['./mentor-edit.component.css']
})
export class MentorEditComponent implements OnInit {

  skillForm: FormGroup;
  skillList: Skill[] = [];
  errorMessage: string = null;
  user: User
  skillDetails: SkillDetails
  constructor(private userService: UserService, private formBuild: FormBuilder, private trainingService: TrainingService, private authService: AuthService) { }

  ngOnInit() {

    this.errorMessage = null;
    this.buildSkillForm()
    this.skillList = [];
    this.userService.getAllSkills().subscribe(
      (data) => {
        this.skillList = data;
      },
      (error) => {
        console.log(error);
      }
    )
    this.authService.getUser().subscribe(
      data => {
        this.user = data
        console.log(data)
      }
    )
  }
  buildSkillForm() {
    this.skillForm = this.formBuild.group({
      skill: ['', [
        Validators.required
      ]],
      selfRating: ['', [
        Validators.required,
        Validators.max(10),
        Validators.min(0)
      ]],
      yearsExperience: ['', [
        Validators.required,
        Validators.min(0),
        // Validators.
      ]],
    })
  }
  get skill() {
    return this.skillForm.get('skill');
  }
  get selfRating() {
    return this.skillForm.get('selfRating');
  }
  get yearsExperience() {
    return this.skillForm.get('yearsExperience');
  }
  addSkill(formData: any) {
    this.skillDetails = {
      mentor: { active: null, linkedinUrl: null, yearsOfExperience: null, user: this.user, id: null },
      skill: this.skillList.find(skill => skill.name == formData["skill"]),
      self_rating: formData["selfRating"],
      yearsOfExperience: formData["yearsExperience"]
    }
    this.trainingService.addMentorSkillAfterLogin(this.skillDetails).subscribe(
      (data) => {
        window.alert("Your details are submitted successfully");
        this.buildSkillForm();
      },
      (error) => {
        console.log(error);
        if (error.error.message == "This skill exists for this mentor") {
          this.errorMessage = "This skill exists for this mentor";
        }
      }
    );
  }


}
