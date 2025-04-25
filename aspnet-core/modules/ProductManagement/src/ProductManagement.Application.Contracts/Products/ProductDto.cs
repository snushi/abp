//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ProductManagement.Products
//{
//    class ProductDto
//    {
//    }
//}


using System;
using Volo.Abp.Application.Dtos;

namespace ProductManagement.Products;

public class ProductDto : AuditedEntityDto<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int StockCount { get; set; }
    public ProductStatus Status { get; set; }
}