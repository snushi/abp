import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './products/product.component';
import { PermissionGuard } from '@abp/ng.core';
import { EditProductComponent } from './products/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductComponent,
    // canActivate: [PermissionGuard],
    // data: {
    //   requiredPolicy: 'Products.Read'
    // } //kntodo
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent,
    canActivate: [PermissionGuard],
    data: {
      requiredPolicy: 'ProductManagement.Products.Edit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }