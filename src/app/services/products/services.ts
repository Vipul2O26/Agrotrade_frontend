import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { SessionService } from '../session';
import { Product } from '../../models/product/product-module'; // ✅ use the model only

@Injectable({
  providedIn: 'root'
})
export class Service {
  private apiUrl = 'http://localhost:5142/api/Products'; 

  constructor(
    private http: HttpClient,
    private sessionServices: SessionService
  ) { }

  addProduct(productData: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productData);
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name); 
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getMyProductsByUserId(): Observable<Product[]> {
    const userSession = this.sessionServices.getUserSession();
    if (!userSession || !userSession.userId) { 
      return new Observable<Product[]>(observer =>
        observer.error('User ID not available in session. Please log in.')
      );
    }

    return this.http.get<Product[]>(`${this.apiUrl}/by-user/${userSession.userId}`); 
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }
}
