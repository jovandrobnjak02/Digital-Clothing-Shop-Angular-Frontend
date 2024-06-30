import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClothingItem } from '../models/clothing-item.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private items = new BehaviorSubject<ClothingItem[]>([]);

  getItems() {
    return this.items.asObservable();
  }

  addItem(item: ClothingItem) {
    const currentItems = this.items.value;
    this.items.next([...currentItems, item]);
  }

  removeItem(id: number) {
    const updatedItems = this.items.value.filter(item => item.id !== id);
    this.items.next(updatedItems);
  }
}
