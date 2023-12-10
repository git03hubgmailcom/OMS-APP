import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { CartItem } from 'src/app/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private apiUrl = 'http://172.24.155.65:8000/api/cart-items';

  constructor(private http: HttpClient) {}

  // CREATE
  createCartItem(cartItem: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cartItem);
  }

  // READ
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  getCartItem(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateCartItem(id: number, cartItem: CartItem): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cartItem);
  }

  // DELETE
  deleteCartItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
