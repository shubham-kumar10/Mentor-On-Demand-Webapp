import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean;
  error: string = "Login Failed"

  constructor(private formBuild: FormBuilder, private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuild.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  getUsername() {
    return this.loginForm.value['username'];
  }

  getPassword() {
    return this.loginForm.value['password'];
  }

  toSignup() {
    this.router.navigate(['signup'])
  }
  onSubmit() {
    this._authService.authenticate(this.getUsername(), this.getPassword()).subscribe(
      data => {
        console.log(data);
        this._authService.setToken(data.token);
        this.error = "Logged In successfully";
        this._authService.role = data.role;
        this._authService.username = this.getUsername();
        this._authService.firstname = data.firstname
        this._authService.lastname = data.lastname
        this._authService.loggedIn = true;
        this._authService.validCredentials = true;
        this.router.navigate(['/search'])
        console.log(data.role);
        console.log("logged");
        console.log(this._authService.loggedIn);
        console.log(data.token);
        console.log(data.role);
        if (data.role == 'Mentor')
          this.router.navigate(["/mentor"]);
      },
      error => {
        this._authService.validCredentials = false;
        this.invalidLogin = true
        if (error.status == 401)
          this.error = "Invalid Username or Password";
        console.log(error);
      }
    );
  }
}
