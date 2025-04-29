// edit-product.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { ProductDto } from '../shared/models/product.model';
import { CreateUpdateProductDto } from '../shared/models/create-update-product.model';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  "standalone": false,
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  productId: string;
  isSubmitting = false;
  product: ProductDto;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToasterService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loadProduct();
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

  loadProduct(): void {
    this.productService.get(this.productId).subscribe({
      next: (product) => {
        this.product = product;
       // alert(product.description + product.concurrencyStamp)
        this.form.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stockCount: product.stockCount,
          isAvailable: product.isAvailable
        });
      },
      error: () => {
        this.toaster.error('Failed to load product');
        this.router.navigate(['/product-management/products']);
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSubmitting = true;
    //const productDto = this.form.value as CreateUpdateProductDto;

    const formValues = this.form.value;
    
    // if (Object.keys(this.product.extraProperties).length === 0) {
    //    this.product.extraProperties = {};
    // }
// console.log('asd');
// console.log(this.product.concurrencyStamp);
// console.log(this.product);

//this.product.lastModificationTime = Date.now();

    const productDto: CreateUpdateProductDto = {
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      stockCount: formValues.stockCount,
      isAvailable: formValues.isAvailable,
      status: this.product.status, // Use the existing status value
      
      // Include the concurrency stamp from the existing product
      concurrencyStamp: this.product.concurrencyStamp,

      // These fields are usually managed by the server, but include them if needed
      creationTime: this.product.creationTime,
      creatorId: this.product.creatorId,
      lastModificationTime: new Date(),//this.product.lastModificationTime,
      lastModifierId: this.product.lastModifierId,
      extraProperties: "{}",//this.product.extraProperties,
    };

    console.log('asd');
    productDto.concurrencyStamp = this.product.concurrencyStamp;
    console.log('Updating product with data:', productDto);

    // if (this.product && this.product.concurrencyStamp) {
    //   productDto.concurrencyStamp = this.product.concurrencyStamp;
    // }


    this.productService.update(this.productId, productDto).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toaster.success('Product updated successfully');
        this.router.navigate(['/product-management/products']);
      },
      error: () => {
        this.isSubmitting = false;
        this.toaster.error('Failed to update product');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/product-management/products']);
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-edit-product',
//   standalone: false,
//   templateUrl: './edit-product.component.html',
//   styleUrl: './edit-product.component.scss'
// })
// export class EditProductComponent {

// }
