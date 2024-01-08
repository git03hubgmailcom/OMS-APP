import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from './../../models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}`;

    // Set headers to handle CORS
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://oms-slhs.free.nf/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      // Add other headers if needed
    });

    const credentials = {
      username: username,
      password: password,
    };

    const user = this.http.get<any>(`${this.apiUrl}`);
    
    user.subscribe(
      res => {
        console.log(res);
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

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  /* login(username: string, password: string): Observable<any> {
    // Set the headers to include the desired CORS information
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Replace with your Angular app's URL
      
    });

    // Include the headers in the request options
    const requestOptions = {
      headers: headers,
    };

    const user = this.http.get<any>(`${this.apiUrl}`, requestOptions);
    user.subscribe(
      (response) => {
        // Handle success
      },
      (error) => {
        // Handle error
      }
    );
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
  } */

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
