import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClothingItem } from '../models/clothing-item.model';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getClothingItems(): Observable<ClothingItem[]> {
    return this.http.get<ClothingItem[]>(this.apiUrl);
  }

  createProduct(product: ClothingItem): Observable<ClothingItem> {
    return this.http.post<ClothingItem>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ClothingItem): Observable<ClothingItem> {
    const payload = { ...product, productionDate: product.createdAt };
    return this.http.put<ClothingItem>(`${this.apiUrl}/${id}`, payload);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
