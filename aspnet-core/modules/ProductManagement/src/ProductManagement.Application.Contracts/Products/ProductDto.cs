using System;
using Volo.Abp.Application.Dtos;

namespace ProductManagement.Products;

public class ProductDto : AuditedEntityDto<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int StockCount { get; set; }
    public string? ExtraProperties { get; set; }
    public ProductStatus Status { get; set; }

    public required string ConcurrencyStamp { get; set; }

}