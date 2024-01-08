import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './../../models/account.model';
import { Order } from './../../models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  // CREATE
  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  // READ
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateOrder(id: number, order: Order): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, order);
  }

  // DELETE
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
