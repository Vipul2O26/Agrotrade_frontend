import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-module',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [CommonModule , RouterModule]
})
export class ProductModule {}

export interface Product {
  productId?: string; 
  name: string;
  description?: string;
  price: number;
  quantity: number;
  isBidding: boolean;
  imageUrl?: string;
  createdAt?: string;
  farmerId: string;
}
