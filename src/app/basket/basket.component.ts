import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { BasketService } from '../services/basket.service';
import { ClothingItem } from '../models/clothing-item.model';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],  // Include CommonModule here
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItems: ClothingItem[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getItems().subscribe(items => {
      this.basketItems = items;
    });
  }

  removeFromBasket(item: ClothingItem) {
    this.basketService.removeItem(item.id!);
  }
}
