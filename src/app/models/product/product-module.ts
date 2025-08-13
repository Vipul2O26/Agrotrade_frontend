import { NgModule } from '@angular/core';

export interface Product {
  productId: string; // Guid
  name: string;
  description?: string;
  price: number; // decimal(18,2)
  quantity: number;
  isBidding: boolean; // Direct sale or auction
  imageUrl?: string;
  createdAt: Date;
  farmerId: string; // Guid
  bids?: Bid[]; // Navigation property
}

export interface Bid {
  bidId: string; // Guid
  amount: number;
  bidderId: string; // Guid
  createdAt: Date;
}

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class ProductModule {}