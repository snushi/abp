import { TestBed } from '@angular/core/testing';
import { ProductManagementService } from './services/product-management.service';
import { RestService } from '@abp/ng.core';

describe('ProductManagementService', () => {
  let service: ProductManagementService;
  const mockRestService = jasmine.createSpyObj('RestService', ['request']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RestService,
          useValue: mockRestService,
        },
      ],
    });
    service = TestBed.inject(ProductManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
