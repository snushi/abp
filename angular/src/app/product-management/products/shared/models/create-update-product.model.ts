// create-update-product.model.ts
export interface CreateUpdateProductDto {
    //id: string;
    name: string;
    description: string;
    price: number;
    stockCount: number;
    status: number;
    lastModificationTime: Date;
    lastModifierId: string;
    creationTime: Date;
    creatorId: string;
    extraProperties: string;//Record<string, any>;
    concurrencyStamp: string;
    
    
    isAvailable: boolean;
  }