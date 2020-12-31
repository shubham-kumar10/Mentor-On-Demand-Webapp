import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './info/info.component';
import { MentorComponent } from './mentor/mentor.component';
import { MentorEditComponent } from './mentor/mentor-edit/mentor-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MentorDetailsComponent,
    SearchComponent,
    InfoComponent,
    MentorComponent,
    MentorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
