import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedInUser()) {
      this.router.navigate(['/accounts']);
    }
  }

  login() {
    const loginSuccessful = this.authService.login(this.username, this.password);

    if (loginSuccessful) {
      this.router.navigate(['/accounts']);
    } else {
      console.log("login failed");
    }
  }
}
