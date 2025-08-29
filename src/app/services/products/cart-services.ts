import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product/product-module';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCart(): CartItem[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCart(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existing = this.cartItems.find(item => item.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartSubject.next(this.cartItems);
    this.saveCart();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    }
    this.cartSubject.next(this.cartItems);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cart');
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
