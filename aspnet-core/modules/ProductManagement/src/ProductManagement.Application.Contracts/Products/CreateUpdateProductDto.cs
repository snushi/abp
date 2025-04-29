using System;
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Products;

public class CreateUpdateProductDto
{
    [Required]
    [StringLength(128)]
    public string Name { get; set; }

    [StringLength(2000)]
    public string Description { get; set; }

    [Required]
    [Range(0.01, 99999.99)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int StockCount { get; set; }

    public ProductStatus Status { get; set; }

    public DateTime LastModificationTime { get; set; }

    public Guid? LastModifierId { get; set; }
    public DateTime CreationTime { get; set; }

    public Guid CreatorId { get; set; }

    public string ExtraProperties { get; set; }

    public string ConcurrencyStamp { get; set; }

    public Guid Id { get; set; }

    //  LastModificationTime
    //LastModifierId
    //CreationTime
    //CreatorId
    //ExtraProperties
    //ConcurrencyStamp
    //Id
}