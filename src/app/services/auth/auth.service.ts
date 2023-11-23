import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private role = '';

  login(username: string, password: string): boolean {
    // Replace this with your actual login logic
    // For example, check credentials against a server or a stored list
    if (username === 'admin' && password === 'password') {
      // Set some kind of authentication token, for example
      localStorage.setItem('token', 'your_token');
      this.isLoggedIn = true;
      this.role = 'admin';
      return true;
    }

    if (username === 'user' && password === 'password') {
      // Set some kind of authentication token, for example
      localStorage.setItem('token', 'your_token');
      this.isLoggedIn = true;
      this.role = 'user';
      return true;
    }
    return false;
  }

  getRole(): string {
    return this.role;
  }

  logout() {
    // Implement your logout logic here
    // For example, remove the token from localStorage
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  isLoggedInUser(): boolean {
    // Check if the user is logged in
    // For example, check the presence of a token in localStorage
    return this.isLoggedIn || !!localStorage.getItem('token');
  }
}