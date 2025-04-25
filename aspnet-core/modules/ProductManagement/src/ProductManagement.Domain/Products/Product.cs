//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ProductManagement
//{
//    class Product
//    {
//    }
//}

using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace ProductManagement.Products;

public class Product : AuditedAggregateRoot<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int StockCount { get; set; }
    public ProductStatus Status { get; set; }

    private Product() { }

    public Product(
        Guid id,
        string name,
        string description,
        decimal price,
        int stockCount = 0,
        ProductStatus status = ProductStatus.Active)
        : base(id)
    {
        Name = name;
        Description = description;
        Price = price;
        StockCount = stockCount;
        Status = status;
    }
}