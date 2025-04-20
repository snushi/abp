import { ModuleWithProviders, NgModule } from '@angular/core';
import { PRODUCT_MANAGEMENT_ROUTE_PROVIDERS } from './providers/route.provider';

@NgModule()
export class ProductManagementConfigModule {
  static forRoot(): ModuleWithProviders<ProductManagementConfigModule> {
    return {
      ngModule: ProductManagementConfigModule,
      providers: [PRODUCT_MANAGEMENT_ROUTE_PROVIDERS],
    };
  }
}
