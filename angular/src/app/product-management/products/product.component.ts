import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/services/product.service';
import { ProductDto } from './shared/models/product.model';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  products: PagedResultDto<ProductDto> = { items: [], totalCount: 0 };
  
  isModalOpen = false;
  selectedProduct = {} as ProductDto;
  form: any = {};
  
  filters = { filter: '' };
  
  constructor(
    private productService: ProductService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const requestDto = {
      maxResultCount: 10,
      skipCount: 0,
      sorting: 'name',
      filter: this.filters.filter
    };

    this.productService.getListFiltered(requestDto).subscribe(result => {
      this.products = result;
    });
  }

  createProduct(): void {
    this.selectedProduct = {} as ProductDto;
    this.isModalOpen = true;
  }

  editProduct(product: ProductDto): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  deleteProduct(product: ProductDto): void {
    this.confirmation.warn(
      'Product deletion',
      `Are you sure you want to delete the product ${product.name}?`
    ).subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.confirmDeleteProduct(product.id);
      }
    });
  }

  // deleteProduct(product: ProductDto): void {
  //   this.confirmation.warn(
  //     'Product deletion',
  //     `Are you sure you want to delete the product ${product.name}?`,
  //     { isConfirmed: () => this.confirmDeleteProduct(product.id) }
  //   );
  // }

  confirmDeleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }

  onModalClose(): void {
    this.isModalOpen = false;
    this.loadProducts();
  }

  onSearch(): void {
    this.loadProducts();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ProductService } from './shared/services/product.service';
// import { ProductDto } from './shared/models/product.model';
// import { PagedResultDto } from '@abp/ng.core';
// import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html'
//   // No standalone property at all
// })
// export class ProductComponent implements OnInit {
//   products: PagedResultDto<ProductDto> = { items: [], totalCount: 0 };
  
//   isModalOpen = false;
//   selectedProduct = {} as ProductDto;
//   form: any = {};
  
//   filters = { filter: '' };
  
//   constructor(
//     private productService: ProductService,
//     private confirmation: ConfirmationService
//   ) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   // Rest of the component implementation...
// }