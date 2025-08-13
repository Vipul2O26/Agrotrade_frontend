import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../models/product/product-module'; // Assuming this path is correct
import { Service as ProductService } from '../../../services/products/services';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../services/session';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // 👈 Added 'of' import
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  standalone: true,
  templateUrl: './add.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class Add implements OnInit {
  productForm!: FormGroup;
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  isLoggedInUserFound: boolean = true;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', Validators.maxLength(500)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      isBidding: [false],
      imageUrl: ['']
    });

    this.checkUserSession();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.showMessage(`File "${file.name}" selected.`, 'success');
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
      this.showMessage('No file selected.', 'error');
    }
  }

  private checkUserSession(): void {
    const user = this.sessionService.getUserSession();
    if (!user || !user.userId) {
      this.showMessage('No logged-in user found. Please log in to add products.', 'error');
      this.isLoggedInUserFound = false;
    } else {
      this.isLoggedInUserFound = true;
    }
  }

  onSubmit() {
    this.message = null;

    if (!this.isLoggedInUserFound) {
      this.showMessage('Cannot submit: No logged-in user found. Please log in.', 'error');
      return;
    }

    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      this.showMessage('Please fill in all required fields correctly.', 'error');
      return;
    }

    const userSession = this.sessionService.getUserSession();
    if (!userSession || !userSession.userId) {
      this.showMessage('No valid logged-in user ID found. Please log in again.', 'error');
      this.isLoggedInUserFound = false;
      return;
    }

    if (this.selectedFile) {
      this.showMessage('Uploading image...', 'success');
      this.productService.uploadImage(this.selectedFile).pipe(
        switchMap((uploadResponse: { imageUrl: string }) => {
          this.productForm.patchValue({ imageUrl: uploadResponse.imageUrl });
          this.showMessage('Image uploaded successfully! Submitting product...', 'success');
          return this.submitProductData(userSession.userId);
        })
      ).subscribe({
        next: () => {
          // Success message for the whole process handled by submitProductData
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error during image upload or product submission:', err);
          this.showMessage(`Failed to add product: ${err.error?.message || err.statusText || err.message}`, 'error');
        }
      });
    } else {
      this.submitProductData(userSession.userId).subscribe({
        next: () => {
          // Success message handled by submitProductData
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error submitting product:', err);
          this.showMessage(`Failed to add product: ${err.error?.message || err.statusText || err.message}`, 'error');
        }
      });
    }
  }

  private submitProductData(userId: string): Observable<any> {
    const product: Product = {
      ...this.productForm.value,
      userId: userId
    };

    const addProductObservable: Observable<any> = this.productService.addProduct(product);

    return addProductObservable.pipe(
      switchMap(response => {
        this.showMessage('Product added successfully!', 'success');
        this.productForm.reset({ isBidding: false, imageUrl: '' });
        this.selectedFile = null;
        this.selectedFileName = null;
        return of(response);
      })
    );
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;
  }

  clearMessage(): void {
    this.message = null;
    this.messageType = null;
  }
}
