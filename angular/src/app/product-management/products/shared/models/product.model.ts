import { AuditedEntityDto } from '@abp/ng.core';

export interface ProductDto extends AuditedEntityDto<string> {
  name: string;
  description: string;
  price: number;
  stockCount: number;
  isAvailable: boolean;
  status: number;


   id: string;
  // name: string;
  // description: string;
  // price: number;
  // stockCount: number;
  // status: number;
   lastModificationTime: Date;
  // lastModifierId: string;
   creationTime: Date;
  // creatorId: string;
   extraProperties?: Record<string, any>;
   concurrencyStamp: string;
}