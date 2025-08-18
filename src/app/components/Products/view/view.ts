import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product/product-module';
import { Service } from '../../../services/products/services';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.html',
  standalone: true,
  imports: [CommonModule , Header , RouterLink , FormsModule]
})
export class View implements OnInit {

  products: Product[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }


}