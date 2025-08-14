import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { SessionService } from '../session';

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

@Injectable({
  providedIn: 'root'
})
export class Service {

  private apiUrl = 'http://localhost:5142/api/Products'; // Ensure this matches your backend URL

  constructor(private http: HttpClient,
              private sessionServices: SessionService
  ) { }


  addProduct(productData: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productData);
  }

  
  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name); // 'file' must match the parameter name in your backend endpoint

    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getMyProductsByUserId(): Observable<Product[]> {
    const userSession = this.sessionServices.getUserSession();
    
    if (!userSession || !userSession.userId) { 
      return new Observable<Product[]>(observer => observer.error('User ID not available in session. Please log in.'));
    }

    const userId = userSession.userId; 

    
    return this.http.get<Product[]>(`${this.apiUrl}/by-user/${userId}`); 
  }


  getProductById(productId: string): Observable<Product> {
    
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  
}
