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
      if(this.authService.getRole() == "admin"){
        this.router.navigate(['/admin-menu-list']);
      }else{
        this.router.navigate(['/menu-list']);
      }
    }
  }

  login() {
    const loginSuccessful = this.authService.login(this.username, this.password);

    if (loginSuccessful) {
      if(this.authService.getRole() == "admin"){
        this.router.navigate(['/admin-menu-list']);
      }else{
        this.router.navigate(['/menu-list']);
      }

    } else {
      console.log("login failed");
    }
  }
}
