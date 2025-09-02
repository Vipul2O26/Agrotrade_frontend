import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header';
import { CartService , CartItem } from '../../../services/products/cart-services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,HeaderComponent],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(index: number) {
    this.cartService.updateQuantity(index, this.cartItems[index].quantity + 1);
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartService.updateQuantity(index, this.cartItems[index].quantity - 1);
    }
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout() {
    alert('Proceeding to checkout...');
   
    //this.cartService.clearCart();
  }
}
