import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product/product-module';
import { Service } from '../../../services/products/services';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';

@Component({
  selector: 'app-myproducts',
  standalone: true,
  imports: [ ReactiveFormsModule , CommonModule , Header],
  templateUrl: './myproducts.html',
  styleUrl: './myproducts.css'
})
export class Myproducts implements OnInit {

  myProducts: Product[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.service.getMyProductsByUserId().subscribe({
      next: (data) => {
        this.myProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch my products:', err);
        this.errorMessage = err.error?.message || 'Failed to load your products. Please log in and try again.';
        this.isLoading = false;
      }
    });
  }
}
