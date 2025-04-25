import { AuditedEntityDto } from '@abp/ng.core';

export interface ProductDto extends AuditedEntityDto<string> {
  name: string;
  description: string;
  price: number;
  stockCount: number;
  isAvailable: boolean;
}