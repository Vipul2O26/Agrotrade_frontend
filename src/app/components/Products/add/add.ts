import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Service } from '../../../services/products/services';
import { SessionService } from '../../../services/session';
import { FarmerComponent } from '../../farmer/farmer';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FarmerComponent],
  templateUrl: './add.html',
  styleUrls: ['./add.css']
})
export class Add implements OnInit {
  productForm!: FormGroup;
  selectedFile: File | null = null;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: Service,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      isBidding: [false, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.productForm.valid) return;
  
    const formData = new FormData();
    formData.append('Name', this.productForm.get('name')?.value);
    formData.append('Description', this.productForm.get('description')?.value);
    formData.append('Price', this.productForm.get('price')?.value);
    formData.append('Quantity', this.productForm.get('quantity')?.value);
    formData.append('IsBidding', this.productForm.get('isBidding')?.value);
    formData.append('UserId', this.sessionService.getUserSession().userId);
  
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name); // ✅ MUST match backend field name
    }
  
    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.successMessage = '✅ Product added successfully!';
        this.productForm.reset({
          name: '',
          description: '',
          price: 0,
          quantity: 1,
          isBidding: false
        });
        this.selectedFile = null;
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to add product. ' + (err.error?.message || '');
      }
    });
  }
  
}
