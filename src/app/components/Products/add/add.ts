import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class Add {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      isBidding: ['false', Validators.required],
      imageUrl: ['', Validators.pattern(/https?:\/\/.+/)]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Product Data:', this.productForm.value);
      // Add logic to send data to the backend
    }
  }
}