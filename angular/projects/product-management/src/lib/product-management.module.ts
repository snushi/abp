import { NgModule, NgModuleFactory, ModuleWithProviders } from '@angular/core';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ProductManagementComponent } from './components/product-management.component';
import { ProductManagementRoutingModule } from './product-management-routing.module';

@NgModule({
  declarations: [ProductManagementComponent],
  imports: [CoreModule, ThemeSharedModule, ProductManagementRoutingModule],
  exports: [ProductManagementComponent],
})
export class ProductManagementModule {
  static forChild(): ModuleWithProviders<ProductManagementModule> {
    return {
      ngModule: ProductManagementModule,
      providers: [],
    };
  }

  static forLazy(): NgModuleFactory<ProductManagementModule> {
    return new LazyModuleFactory(ProductManagementModule.forChild());
  }
}
