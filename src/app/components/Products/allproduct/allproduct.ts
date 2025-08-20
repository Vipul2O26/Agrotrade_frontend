import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product/product-module';
import { Service } from '../../../services/products/services';

@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [CommonModule, Header , ReactiveFormsModule],
  templateUrl: './allproduct.html',
  styleUrls: ['./allproduct.css']
})
export class Allproduct implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private productService: Service) {}

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
}
