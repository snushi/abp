import { Injectable } from '@angular/core';
import { RestService, ABP } from '@abp/ng.core';
import { Observable } from 'rxjs';
import { PagedResultDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
//import { ProductDto, CreateUpdateProductDto } from '../models';
import { ProductDto } from '../models/product.model';
import { CreateUpdateProductDto } from '../models/create-update-product.model';

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
      url: '/api/product-management/products',
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
       url: '/api/product-management/products',
      params: {
        FilterText: input.filter,
        skipCount: input.skipCount,
        maxResultCount: input.maxResultCount,
        sorting: input.sorting
      }
    });
  }

  get(id: string): Observable<ProductDto> {
    return this.restService.request<void, ProductDto>({
      method: 'GET',
      url: `/api/product-management/products/${id}`
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

create(input: CreateUpdateProductDto): Observable<ProductDto> {
  return this.restService.request<CreateUpdateProductDto, ProductDto>({
    method: 'POST',
    url: '/api/product-management/products',
    body: input
  });
}

// updateORI(id: string, input: CreateUpdateProductDto): Observable<ProductDto> {
//   console.log(input);
  
//   input.status = 0;
//   //input.id = id;
//   input.creationTime = new Date();
//   input.lastModificationTime = new Date();
//   input.creatorId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
//   input.lastModifierId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
//   //input.extraProperties = '{}'
//   input.concurrencyStamp = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  
//   return this.restService.request<CreateUpdateProductDto, ProductDto>({
//     method: 'PUT',
//     url: `/api/product-management/products/${id}`,
//     body: input
//   });
// }

update(id: string, input: CreateUpdateProductDto): Observable<ProductDto> {
  return this.restService.request<CreateUpdateProductDto, ProductDto>({
    method: 'PUT',
    url: `/api/product-management/products/${id}`,
    body: input
  });
}

// update(id: string, input: CreateUpdateProductDto): Observable<ProductDto> {
//   console.log(input);
//   return this.restService.request<CreateUpdateProductDto, ProductDto>({
//     method: 'PUT',
//     url: `/api/product-management/products/${id}`,
//     body: input
//   });
// }


  delete(id: string): Observable<void> {
    return this.restService.request<void, void>({
      method: 'DELETE',
      url: `/api/product-management/products/${id}`
    });
  }
}