import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'http://172.24.155.65:8000/api/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const user = this.http.post<any>(`${this.apiUrl}/login`, { username, password });
    user.subscribe(
      res => {
        if(res.success == true){
          localStorage.setItem('token', "");
          localStorage.setItem('role', res.data.role);
          localStorage.setItem('userId', res.data.id);
          this.isLoggedIn = true;
        }

      },
      err => {
        console.log(err);
      }
    );
    return user;
  }

  /* login(username: string, password: string): boolean {
   
    // Replace this with your actual login logic
    // For example, check credentials against a server or a stored list
    if (username === 'admin' && password === 'password') {
      // Set some kind of authentication token, for example
      localStorage.setItem('token', 'your_token');
      localStorage.setItem('role', 'admin');
      localStorage.setItem('userId', '3');
      this.isLoggedIn = true;
      return true;
    }

    if (username === 'customer' && password === 'password') {
      // Set some kind of authentication token, for example
      localStorage.setItem('token', 'your_token');
      localStorage.setItem('role', 'customer');
      localStorage.setItem('userId', '3');
      this.isLoggedIn = true;
      return true;
    }

    if (username === 'collector' && password === 'password') {
      // Set some kind of authentication token, for example
      localStorage.setItem('token', 'your_token');
      localStorage.setItem('role', 'collector');
      localStorage.setItem('userId', '3');
      this.isLoggedIn = true;
      return true;
    }

    return false;
  } */

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  logout() {
    // Implement your logout logic here
    // For example, remove the token from localStorage
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  isLoggedInUser(): boolean {
    // Check if the user is logged in
    // For example, check the presence of a token in localStorage
    return this.isLoggedIn || !!localStorage.getItem('token');
  }

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${this.getUserId()}`);
  }
}
