import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../header/header';
import { Service } from '../../../services/products/services';
import { SessionService } from '../../../services/session';
import { Product } from '../../../models/product/product-module';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add implements OnInit {
  productForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: Service,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      isBidding: [false, Validators.required],
      imageUrl: [''] // can be set later via upload
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userSession = this.sessionService.getUserSession();
    if (!userSession || !userSession.userId) {
      this.errorMessage = 'You must be logged in to add a product.';
      this.isSubmitting = false;
      return;
    }

    const newProduct: Product = {
      ...this.productForm.value,
      userId: userSession.userId 
    };

    this.productService.addProduct(newProduct).subscribe({
      next: () => {
        this.successMessage = 'Product added successfully!';
        this.isSubmitting = false;
        this.productForm.reset({
          name: '',
          description: '',
          price: 0,
          quantity: 1,
          isBidding: false,
          imageUrl: ''
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to add product. ' + (err.error?.message || '');
        this.isSubmitting = false;
      }
    });
  }
}
