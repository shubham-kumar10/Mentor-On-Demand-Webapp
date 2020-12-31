import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { SearchComponent } from './search/search.component';
import { MentorComponent } from './mentor/mentor.component';
import { MentorEditComponent } from './mentor/mentor-edit/mentor-edit.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mentor-signup', component: MentorDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'mentor', component: MentorComponent },
  { path: 'edit-mentor', component: MentorEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
