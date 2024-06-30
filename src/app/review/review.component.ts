import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClothingItem } from '../models/clothing-item.model';
import { BasketService } from '../services/basket.service';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { ClothingSize } from '../models/clothing-size.model';

@Component({
  selector: 'app-clothing-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() productId: number | undefined;
  product: any;
  reviews: any[] = [];
  reviewText: string = '';
  reviewGrade: number | undefined;
  token: string | null = null;

  constructor(private http: HttpClient, private basketService: BasketService, private cookieService: CookieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.token = this.cookieService.get("token");
    }
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      this.loadProduct();
    });
  }

  loadProduct() {
    if (this.productId) {
      this.http.get(`http://localhost:8080/products/${this.productId}`).subscribe({
        next: (data: any) => {
          this.product = data;
          this.product["sizes"] = data["clothingSizes"].map((elem: { [x: string]: any; }) => {
            return elem["size"];
          }).join(", ")
          this.loadReviews();
        },
        error: (error) => {
          console.error('Error loading product:', error);
        }
      });
    }
  }

  loadReviews() {
    if (this.productId) {
      this.http.get(`http://localhost:8080/products/reviews?clothingId=${this.productId}`).subscribe({
        next: (data: any) => {
          this.reviews = data;
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
        }
      });
    }
  }

  addReview() {
    if (this.productId && this.reviewText && this.reviewGrade) {
      const review = {
        clothingId: this.productId,
        comment: this.reviewText,
        grade: this.reviewGrade
      };

      this.http.post('http://localhost:8080/products/reviews/add', review, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      }).subscribe({
        next: (data: any) => {
          alert(data.message);
          this.loadReviews();
          this.reviewText = '';
          this.reviewGrade = undefined;
        },
        error: (error) => {
          console.error('Error adding review:', error);
        }
      });
    }
  }

  addToBasket(item: ClothingItem): void {
    this.basketService.addItem(item);
    alert('Item added to basket!');
  }
}
