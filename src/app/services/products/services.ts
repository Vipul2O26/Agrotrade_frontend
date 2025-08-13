import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Ensure Observable is imported

// Assuming your Product interface is correctly defined elsewhere and imported.
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
export class Service { // Your ProductService is named 'Service'
  private apiUrl = 'http://localhost:5142/api/Products'; // Ensure this matches your backend URL

  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to add a new product.
   * @param productData The product data to be added, including UserId.
   * @returns An Observable of the API response.
   */
  // 👈 Ensure this line explicitly says 'Observable<any>'
  addProduct(productData: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productData);
  }

  /**
   * Uploads an image file to the backend.
   * @param file The File object to upload.
   * @returns An Observable containing the response, which should include the image URL.
   */
  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file, file.name); // 'file' must match the parameter name in your backend endpoint

    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/upload-image`, formData);
  }
}
