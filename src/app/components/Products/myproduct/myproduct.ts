import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header';
import { Service } from '../../../services/products/services';
import { Product } from '../../../models/product/product-module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myproduct',
  imports: [ HeaderComponent , CommonModule],
  templateUrl: './myproduct.html',
  styleUrl: './myproduct.css'
})
export class Myproduct {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';
currentUserId: any;
isAdmin: any;
  constructor(private services: Service , private router: Router){}

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
