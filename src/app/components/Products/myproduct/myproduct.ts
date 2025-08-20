import { Component } from '@angular/core';
import { Header } from '../../header/header';
import { Service } from '../../../services/products/services';
import { Product } from '../../../models/product/product-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myproduct',
  imports: [ Header , CommonModule],
  templateUrl: './myproduct.html',
  styleUrl: './myproduct.css'
})
export class Myproduct {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';
  constructor(private services: Service){}

  ngOnInit(): void {
    this.services.getAllProducts().subscribe({
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
