import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ClothingService } from '../services/clothing.service';
import { BasketService } from '../services/basket.service';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { ClothingItem } from '../models/clothing-item.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  clothingItems: ClothingItem[] = [];
  filteredItems: ClothingItem[] = [];
  editableProduct: ClothingItem = this.getEmptyProduct();
  showAddProductForm = false;
  searchName: string = '';
  searchType: string = '';


  constructor(
    private clothingService: ClothingService, 
    private basketService: BasketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.clothingService.getClothingItems().subscribe(items => {
      items.map(item => {
        item.sizes =  item.clothingSizes.map(size => {
          return size.size
        }).join(", ")
      })
      this.clothingItems = items;
      this.filteredItems = items;
  
    }, error => {
      console.error('Failed to load clothing items', error);
    });
  }

  filterItems() {
    this.filteredItems = this.clothingItems.filter(item =>
      item.itemName.toLowerCase().includes(this.searchName.toLowerCase()) &&
      item.type.toLowerCase().includes(this.searchType.toLowerCase())
    );
  }

  addToBasket(item: ClothingItem): void {
    this.basketService.addItem(item);
    alert('Item added to basket!');
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleAddProductForm(product?: ClothingItem): void {
    this.editableProduct = product ? {...product} : this.getEmptyProduct();
    this.showAddProductForm = true;
  }

  saveProduct(): void {
    const serviceCall = this.editableProduct.id
      ? this.clothingService.updateProduct(this.editableProduct.id, this.editableProduct)
      : this.clothingService.createProduct(this.editableProduct);

    serviceCall.subscribe({
      next: () => {
        alert('Product saved successfully!');
        this.loadProducts();
        this.showAddProductForm = false;
      },
      error: (error) => {
        console.error('Failed to save the product', error);
        alert('Failed to save product!');
      }
    });
  }

  deleteProduct(id: number) {
    if(confirm('Are you sure you want to delete this product?')) {
      this.clothingService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully!');
        this.loadProducts();
      });
    }
  }

  getEmptyProduct(): ClothingItem {
    return {
      id: 0,
      itemName: '',
      type: '',
      sizes: '',
      manufacturer: '',
      createdAt: new Date(),
      price: 0,
      clothingSizes: [],
      colors: []
    };
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['product', productId]);
  }
}
