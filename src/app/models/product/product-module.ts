

export interface Bid {
  bidId: string; // Guid
  amount: number;
  bidderId: string; // Guid
  createdAt?: Date; // Optional because API may set it
}

export interface Product {
  productId?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  isBidding: boolean;
  imageUrl?: string;
  createdAt?: Date;
  userId: string; 
  bids?: any[];
}




export class ProductModule {}