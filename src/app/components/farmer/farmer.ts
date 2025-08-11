import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  isBidding: boolean;
}

@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmer.html',
})
export class FarmerComponent implements OnInit {
  fullName = '';
  products: Product[] = [];

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the full name from the session service
    this.fullName = this.sessionService.getName() ?? '';

    // Initialize products
    this.products = [
      { productId: 1, name: 'Tomatoes', price: 20.5, quantity: 100, isBidding: false },
      { productId: 2, name: 'Potatoes', price: 15, quantity: 200, isBidding: true },
    ];
  }

  alert(arg0: string) {
    console.log('Add product functionality coming soon!');
  }

  logout() {
    this.sessionService.clearSession(); // Clear session data
    this.router.navigate(['/login']); // Redirect to login page
  }
}