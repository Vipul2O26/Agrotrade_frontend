import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { SessionService } from '../session';
import { Product } from '../../models/product/product-module';

@Injectable({
  providedIn: 'root'
})
export class Service {
 
  private apiUrl = 'http://localhost:5142/api/Products'; 

  constructor(
    private http: HttpClient,
    private sessionServices: SessionService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    });
  }
  
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData, {
      headers: this.getAuthHeaders().delete("Content-Type")
    });
  }
    
  
  

  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productData, {
      headers: this.getAuthHeaders()
    });
  }
 
  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name); 
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getMyProductsByUserId(): Observable<Product[]> {
    const userSession = this.sessionServices.getUserSession();
    if (!userSession || !userSession.userId) { 
      return new Observable<Product[]>(observer =>
        observer.error('User ID not available in session. Please log in.')
      );
    }

    return this.http.get<Product[]>(`${this.apiUrl}/by-user/${userSession.userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
