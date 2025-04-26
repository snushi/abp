import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';

// Replace the commercial module with these open-source modules
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CoreModule } from '@abp/ng.core';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductComponent } from './products/product.component';
// import { CreateProductComponent } from './products/create-product/create-product.component';
// import { EditProductComponent } from './products/edit-product/edit-product.component';

@NgModule({
  declarations: [
    //ProductComponent,
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
    NgxValidateCoreModule,
    // Replace CommercialUiModule with these
    ThemeSharedModule,
    CoreModule
  ]
})
export class ProductManagementModule { }