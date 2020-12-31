import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mentor-On-Demand';

  ngOnInit(): void {
    this.loggedIn();
    this.router.navigate(['/search']);
  }
  constructor(public authService: AuthService, public router: Router) {
  }


  isLoggedIn: boolean = false;

  // clickOnAddFavorite() {
  //   this.productService.clickedOnAdd = false;
  //   this.productService.addedToFavorites = false;
  // }

  loggedIn(): boolean {
    if (this.authService.loggedIn) {
      this.isLoggedIn = true;
      return true
    }
    else {
      this.isLoggedIn = false;
      return false;
    }
  }
  // clickOnAddCart() {
  //   this.productService.clickedOnAdd = false;
  //   this.productService.addedToFavorites = false;
  // }
  exit() {
    window.location.reload();
  }
}
