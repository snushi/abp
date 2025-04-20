import { Injectable } from '@angular/core';
import { RestService } from '@abp/ng.core';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  apiName = 'ProductManagement';

  constructor(private restService: RestService) {}

  sample() {
    return this.restService.request<void, any>(
      { method: 'GET', url: '/api/ProductManagement/sample' },
      { apiName: this.apiName }
    );
  }
}
