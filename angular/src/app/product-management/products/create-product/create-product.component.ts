import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { CreateUpdateProductDto } from '../shared/models/create-update-product.model';
import { ToasterService } from '@abp/ng.theme.shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  "standalone": false,
})

export class CreateProductComponent implements OnInit {
  @Output() saveCompleted = new EventEmitter<any>();
  @Output() cancelClicked = new EventEmitter<void>();
  
  form: FormGroup;
  isSubmitting = false;

// export class CreateProductComponent {
//   @Output() modalClose = new EventEmitter<void>();
//   form: FormGroup;
//   isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private toaster: ToasterService,
    private router: Router,
    private productService: ProductService
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      description: ['', [Validators.maxLength(1024)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockCount: [0, [Validators.required, Validators.min(0)]],
      isAvailable: [true]
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    
    // Get the form values
    const formValues = this.form.value;
    
    const productDto: CreateUpdateProductDto = {
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      stockCount: formValues.stockCount,
      isAvailable: formValues.isAvailable,
      status: formValues.status || 0,
      extraProperties: "{}",//{} as Record<string, any>, // Empty object for extra properties
      concurrencyStamp: "",
      lastModificationTime: undefined,
      lastModifierId: undefined,
      creationTime: undefined,
      creatorId: undefined
    };

    console.log('Creating product with data:', productDto);

    this.productService.create(productDto).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        console.log('Create successful:', result);
        this.toaster.success('Product created successfully');
        this.router.navigate(['/product-management/products']);

        this.saveCompleted.emit(result);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Create error:', error);
        this.toaster.error('Failed to create product: ' + this.getErrorMessage(error));
      }
    });
  }

  getErrorMessage(error: any): string {
    if (error.error && error.error.error && error.error.error.message) {
      return error.error.error.message;
    }
    return error.message || 'Unknown error';
  }

  // close(): void {
  //   this.modalClose.emit();
  // }
}