import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient, public router: Router) { }

  loggedInUser = { loggedOut: true };
  validCredentials: boolean = true;
  accessToken: string; // JWT token
  loggedIn: boolean = false;
  //private authenticationApiUrl = environment.baseUrl;
  private authenticationApiUrl = environment.baseUrl + 'auth-service/';
  userUrl = environment.baseUrl + 'student-service/'
  private token: string;
  username: string;
  firstname: string;
  lastname: string;
  role: string;


  public setToken(token: string) {
    this.token = token;
  }
  public getToken() {
    return this.token;
  }

  authenticate(user: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa(user + ':' + password));
    return this._httpClient.get(this.authenticationApiUrl + "authenticate", { headers })
  }

  logout() {
    this.loggedIn = false;
    this.setToken(null);
    this.router.navigate(['/welcome'])
  }

  getUser(): Observable<any> {
    return this._httpClient.get(this.userUrl + "findUser/" + this.username);
  }
}
