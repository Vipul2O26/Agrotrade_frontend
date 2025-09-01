import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product/product-module';
import { Service } from '../../../services/products/services';
import { CartService, CartItem } from '../../../services/products/cart-services';
import { FarmerComponent } from '../../farmer/farmer';

@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FarmerComponent],
  templateUrl: './allproduct.html',
  styleUrls: ['./allproduct.css']
})
export class Allproduct implements OnInit {
buyNow(_t20: Product) {
throw new Error('Method not implemented.');
}
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private productService: Service, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);

  // // Buy now action
  // buyNow(product: Product) {
  //   console.log("Buying product:", product);
  //   // later: redirect to checkout page
  // }
}

}