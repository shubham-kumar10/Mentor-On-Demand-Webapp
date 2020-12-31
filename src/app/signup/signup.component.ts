import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Mentor } from '../Model/Mentor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  userType: string;
  user: User;
  mentor: Mentor
  userCreated: boolean = null;
  error: string;
  isMentor: boolean;
  roles: any = [{ id: "M", name: "Mentor" }, { id: "S", name: "Student" }];
  mentorForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.email
      ]],
      firstname: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      lastname: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]],
      contactNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      regCode: ['', [
        Validators.required
      ]],
      role: ['', [
        Validators.required
      ]],
      active: ['', [
      ]],
      confirmedSignUp: ['', [
      ]],
      resetPassword: ['', [
      ]],
      resetPasswordDate: ['', [
      ]]

    })

  }
  get username() {
    return this.signUpForm.get('username');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  get contactNumber() {
    return this.signUpForm.get('contactNumber');
  }
  get regCode() {
    return this.signUpForm.get('regCode');
  }
  get role() {
    return this.signUpForm.get('role');
  }
  get linkedInUrl() {
    return this.mentorForm.get('linkedInUrl');
  }
  get yearsOfExperience() {
    return this.mentorForm.get('yearsOfExperience');
  }
  get active() {
    return this.signUpForm.get('active');
  }
  get confirmedSignUp() {
    return this.signUpForm.get('confirmedSignUp');
  }
  get resetPassword() {
    return this.signUpForm.get('resetPassword');
  }
  get resetPasswordDate() {
    return this.signUpForm.get('resetPasswordDate');
  }

  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }

  addUser() {
    this.user = {
      id: null,
      firstName: this.signUpForm.value['firstname'],
      lastName: this.signUpForm.value['lastname'],
      password: this.signUpForm.value['password'],
      userName: this.signUpForm.value['username'],
      confirmedSignUp: true,
      contactNumber: this.signUpForm.value['contactNumber'],
      regCode: this.signUpForm.value['regCode'],
      role: this.signUpForm.value['role'] == "Student" ? "S" : "M",
      active: true,
      resetPasswordDate: null,
      resetPassword: false
    };
    this.userService.addUser(this.user).subscribe(data => {
      this.userCreated = true;
      this.error = "Signed Up Successfull.Go to Login Confirmed SignUp"
      if (this.user.role == 'M') {
        this.router.navigate(['mentor-signup'])
        this.userService.mentorDTO = { mentor: { id: null, active: false, user: this.user, linkedinUrl: null, yearsOfExperience: 0 }, skills: null };
      }
      console.log(this.userCreated)
    },
      error => {
        console.log("error")
        console.log(error);
        if (error.status == 500 || error.status == 400) {
          this.error = error.messconfirmedSignUp;
          this.userCreated = false;
        }
        console.log(this.error);
      }
    );
  }
}
