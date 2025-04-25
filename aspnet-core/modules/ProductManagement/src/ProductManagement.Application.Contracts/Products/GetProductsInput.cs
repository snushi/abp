//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ProductManagement.Products
//{
//    class GetProductsInput
//    {
//    }
//}
using Volo.Abp.Application.Dtos;

namespace ProductManagement.Products;

public class GetProductsInput : PagedAndSortedResultRequestDto
{
    public string FilterText { get; set; }
    public string Name { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public ProductStatus? Status { get; set; }
}