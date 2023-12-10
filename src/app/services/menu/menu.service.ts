import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://172.24.155.65:8000/api/menus';

  constructor(private http: HttpClient) {}

  // CREATE
  createMenu(menu: Menu): Observable<any> {
    return this.http.post<any>(this.apiUrl, menu);
  }

  // READ
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenu(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateMenu(id: number, menu: Menu): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, menu);
  }

  // DELETE
  deleteMenu(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
