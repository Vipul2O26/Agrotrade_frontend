import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Product } from '../../../models/product/product-module'; 
import { Service } from '../../../services/products/services'; 
import { CommonModule } from '@angular/common'; 
import { Header } from '../../header/header';

@Component({
  selector: 'app-bid',
  standalone: true, 
  imports: [CommonModule , Header], 
  templateUrl: './bid.html',
  styleUrl: './bid.css'
})
export class Bid implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private productService: Service 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('guid'); 
      if (productId) {
        this.isLoading = true;
        this.errorMessage = null;
        this.productService.getProductById(productId).subscribe({
          next: (data) => {
            this.product = data;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Failed to fetch product details:', err);
            this.errorMessage = err.error?.message || 'Failed to load product details.';
            this.isLoading = false;
          }
        });
      } else {
        this.errorMessage = 'Product ID not provided in the URL.';
        this.isLoading = false;
      }
    });
  }
}