import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection } from './../../models/collections.model';
import { CollectionItem } from './../../models/collection-item.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://172.24.155.65:8000/api/collections';

  constructor(private http: HttpClient) {}

  deleteCollectionItem(collection_item_id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${collection_item_id}/collection-item`);
  }

  updateCollectionItem(collection_item_id: number, collection_item: CollectionItem): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${collection_item_id}/collection-item`, collection_item);
  }

  getCollectionItem(collection_item_id: number): Observable<CollectionItem> {
    return this.http.get<CollectionItem>(`${this.apiUrl}/${collection_item_id}/collection-item`);
  }

  addOrder(order_id: number, collection_id: number): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/${collection_id}/add-order/${order_id}`, {});
  }

  // CREATE
  createCollection(collection: Collection): Observable<any> {
    return this.http.post<any>(this.apiUrl, collection);
  }

  // READ
  getCollections(user_id: number): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl + '?user_id=' + user_id);
  }

  getCollection(id: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateCollection(id: number, collection: Collection): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, collection);
  }

  // DELETE
  deleteCollection(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
