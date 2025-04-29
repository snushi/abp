import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';

// Import these ABP modules
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductComponent } from './products/product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { CreateProductComponent } from './products/create-product/create-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    EditProductComponent,
    CreateProductComponent,
    // CreateProductComponent,
    // EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPaginationModule, // Added NgbPaginationModule
    NgxValidateCoreModule,
    CoreModule,
    ThemeSharedModule
  ]
})
export class ProductManagementModule { }


