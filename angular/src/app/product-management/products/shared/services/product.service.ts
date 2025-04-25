import { Injectable } from '@angular/core';
import { RestService, ABP } from '@abp/ng.core';
import { Observable } from 'rxjs';
import { PagedResultDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
//import { ProductDto, CreateUpdateProductDto } from '../models';
import { ProductDto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiName = 'app';

  constructor(private restService: RestService) {}

  getList(
    input: PagedAndSortedResultRequestDto
  ): Observable<PagedResultDto<ProductDto>> {
    return this.restService.request<void, PagedResultDto<ProductDto>>({
      method: 'GET',
      url: '/api/app/products',
      params: {
        skipCount: input.skipCount,
        maxResultCount: input.maxResultCount,
        sorting: input.sorting
      }
    });
  }

  getListFiltered(
    input: PagedAndSortedResultRequestDto & { filter: string }
  ): Observable<PagedResultDto<ProductDto>> {
    return this.restService.request<void, PagedResultDto<ProductDto>>({
      method: 'GET',
      url: '/api/app/products/filtered',
      params: {
        skipCount: input.skipCount,
        maxResultCount: input.maxResultCount,
        sorting: input.sorting,
        filter: input.filter
      }
    });
  }

  get(id: string): Observable<ProductDto> {
    return this.restService.request<void, ProductDto>({
      method: 'GET',
      url: `/api/app/products/${id}`
    });
  }

//   create(input: CreateUpdateProductDto): Observable<ProductDto> {
//     return this.restService.request<CreateUpdateProductDto, ProductDto>({
//       method: 'POST',
//       url: '/api/app/products',
//       body: input
//     });
//   }

//   update(id: string, input: CreateUpdateProductDto): Observable<ProductDto> {
//     return this.restService.request<CreateUpdateProductDto, ProductDto>({
//       method: 'PUT',
//       url: `/api/app/products/${id}`,
//       body: input
//     });
//   }

  delete(id: string): Observable<void> {
    return this.restService.request<void, void>({
      method: 'DELETE',
      url: `/api/app/products/${id}`
    });
  }
}