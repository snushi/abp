import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/services/product.service';
import { ProductDto } from './shared/models/product.model';
import { PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { PermissionService } from '@abp/ng.core';
import { PermissionDirective } from '@abp/ng.core';
import { AuthService } from '@abp/ng.core';
import { Router } from '@angular/router';
import { ConfigStateService, AbpApplicationConfigurationService } from '@abp/ng.core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  "standalone": false,
})
export class ProductComponent implements OnInit {
  hasDeletePermission: boolean = false;
  hasUpdatePermission: boolean = false;
  
  products: PagedResultDto<ProductDto> = { items: [], totalCount: 0 };

  
  //hasUpdatePermission: boolean = false;
  isModalOpen = false;
  selectedProduct = {} as ProductDto;
  form: any = {};
  
  filters = { filter: '' };
  currentPage = 1;
  pageSize = 10;

  constructor(
    private productService: ProductService,
    private confirmation: ConfirmationService,
    private permissionService: PermissionService,
    private authService: AuthService,
    private configState: ConfigStateService,
    private applicationConfigurationService: AbpApplicationConfigurationService,
    private router: Router
    //private permissionStore: PermissionStore
  ) {}

  ngOnInit(): void {
 // Debug: Check the entire configuration
 const config = this.configState.getAll();
 console.log('Full config:', config);
 
 // Check auth specifically
 const auth = this.configState.getOne('auth');
 console.log('Auth config:', auth);
 
 // Check granted policies
 const policies = auth?.grantedPolicies;
 console.log('All granted policies:', policies);
 
 // Check specific policy
 const hasDeletePolicy = policies?.['Products.Delete'];
 console.log('Products.Delete policy:', hasDeletePolicy);
 
 this.hasDeletePermission = this.permissionService.getGrantedPolicy('ProductManagement.Products.Delete');
 this.hasUpdatePermission = this.permissionService.getGrantedPolicy('ProductManagement.Products.Update');
 // this.hasUpdatePermission = this.permissionService.getGrantedPolicy('ProductManagement.Products.Edit');

    // this.hasDeletePermission = this.permissionService.getGrantedPolicy('Products.Delete');
    // this.hasUpdatePermission = this.permissionService.getGrantedPolicy('Products.Update');
//    alert('Delete: ' + this.hasDeletePermission + ' Update: ' +  this.hasUpdatePermission);

    this.loadProducts();
  }

  refreshPage(): void {
    // window.location.reload();
    localStorage.clear();
    sessionStorage.clear();
    
    // Force reload application configuration
    this.applicationConfigurationService.get({ includeLocalizationResources: false }).subscribe(() => {
      // Reload window after getting new config
      window.location.reload();
    });
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
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

  // editProduct(product: ProductDto): void {
  //   this.selectedProduct = product;
  //   this.isModalOpen = true;
  // }

  editProduct(product: ProductDto): void {
    this.router.navigate(['/product-management/products/edit', product.id]);
    //this.router.navigate(['/product-management/products/edit-product', product.id]);
    //this.router.navigate(['/product-management/products']);
  }

  // editProduct(product: ProductDto): void {
  //   this.router.navigate(['/product-management/products/edit', product.id]);
  // }

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