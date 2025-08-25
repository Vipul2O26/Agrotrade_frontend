export interface Bid {
  bidId: string;        
  amount: number;
  bidderId: string;     
  createdAt?: Date;     
}

export interface Product {
  productId?: string;    // Guid from backend
  name: string;
  description?: string;
  price: number;
  quantity: number;
  isBidding: boolean;
  imageUrl?: string;    
  createdAt?: Date;
  userId: string;             
}
