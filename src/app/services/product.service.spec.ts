import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClothingItem } from '../models/clothing-item.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ClothingItem[]> {
    return this.http.get<ClothingItem[]>(`${this.apiUrl}`);
  }

  createProduct(product: ClothingItem): Observable<ClothingItem> {
    return this.http.post<ClothingItem>(`${this.apiUrl}`, product);
  }

  updateProduct(product: ClothingItem): Observable<ClothingItem> {
    return this.http.put<ClothingItem>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
