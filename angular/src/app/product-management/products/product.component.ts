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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProductComponent } from '../products/create-product/create-product.component';

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
    private router: Router,
    private modalService: NgbModal
    //private permissionStore: PermissionStore
  ) {}

  ngOnInit(): void {
 // Debug: Check the entire configuration

 this.getProductList();

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

  // createProduct() {
  //   const modalRef = this.modalService.open(CreateProductComponent);
    
  //   modalRef.componentInstance.saveCompleted.subscribe(result => {
  //     modalRef.close();
  //     this.getProductList();
  //   });
  
  //   modalRef.componentInstance.cancelClicked.subscribe(() => {
  //     modalRef.close();
  //   });
  // }

  createProduct(): void {
    const modalRef = this.modalService.open(CreateProductComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    
    // Subscribe to the events from the modal component
    modalRef.componentInstance.saveCompleted.subscribe(result => {
      modalRef.close();
      // Refresh your product list using your existing method
      this.getProductList();
    });

    modalRef.componentInstance.cancelClicked.subscribe(() => {
      modalRef.close();
    });
  }

  getProductList(): void {
    // Use your existing method to load products
    this.loadProducts();
    // Or if you have a different method to load products, use that instead
  }

  editProduct(product: ProductDto): void {
    this.router.navigate(['/product-management/products/edit', product.id]);
    //this.router.navigate(['/product-management/products/edit-product', product.id]);
    //this.router.navigate(['/product-management/products']);
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