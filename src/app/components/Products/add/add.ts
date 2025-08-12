import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Service } from '../../../services/products/services';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../services/session';
import { Product } from '../../../models/product/product-module';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add {
  productForm;
  sessionService: any;

  constructor(private fb: FormBuilder, private services: Service, sessionService: SessionService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      isBidding: [false],
      imageUrl: [''],
      farmerId: ['']  // You should set this after getting farmer's ID (e.g. from auth/session)
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;
  
    const formValue = this.productForm.value;
  
    const productData: Product = {
      name: formValue.name!,            // assert non-null
      description: formValue.description!,
      price: Number(formValue.price!),  // convert string to number if needed
      quantity: Number(formValue.quantity!),
      isBidding: false,
      farmerId: this.sessionService.getUserId() // or wherever you get it
    };
  
    this.services.addProduct(productData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.productForm.reset();
      },
      error: err => console.error(err)
    });
  }
  
  
  // Example method to get farmerId (adjust according to your session management)
  getFarmerId(): string {
    // Assuming you have a sessionService with getUserId()
    return this.sessionService.getUserId(); 
  }
  
  ngOnInit() {
    const farmerId = sessionStorage.getItem('farmerId') || '';
    this.productForm.patchValue({ farmerId });
  }
  
}


