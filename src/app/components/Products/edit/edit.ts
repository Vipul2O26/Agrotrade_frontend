import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../../services/products/services';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../services/session';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.html'
})
export class EditProduct implements OnInit {
selectedFile: any;

  productForm!: FormGroup;
  productId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: Service,
    private router: Router,
    private sessionServices: SessionService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
      isBidding: [false],   // ✅ add default
      userId: [this.sessionServices.getUserSession()?.userId || ''], // ✅ from session
      imageUrl: ['']
    });

    this.service.getProductById(this.productId).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;
  
    const formData = new FormData();
    formData.append("ProductId", this.productId);
    formData.append("Name", this.productForm.value.name);
    formData.append("Description", this.productForm.value.description || "");
    formData.append("Price", String(this.productForm.value.price));
    formData.append("Quantity", String(this.productForm.value.quantity));
    formData.append("IsBidding", String(!!this.productForm.value.isBidding)); // ✅ always "true"/"false"
    formData.append("UserId", this.productForm.value.userId);
  
    if (this.selectedFile) {
      formData.append("Image", this.selectedFile);
    }
  
    this.service.updateProduct(this.productId, formData).subscribe({
      next: () => this.router.navigate(['/myproduct']),
      error: (err) => console.error('Update failed', err)
    });
  }
  
  
  
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
