import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './../../models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  // CREATE
  createAccount(account: Account): Observable<any> {
    return this.http.post<any>(this.apiUrl, account);
  }

  // READ
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateAccount(id: number, account: Account): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, account);
  }

  // DELETE
  deleteAccount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
