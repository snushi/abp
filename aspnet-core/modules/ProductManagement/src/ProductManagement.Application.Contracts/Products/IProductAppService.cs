//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ProductManagement.Products
//{
//    interface IProductAppService
//    {
//    }
//}
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ProductManagement.Products;

public interface IProductAppService : ICrudAppService<
    ProductDto,
    Guid,
    PagedAndSortedResultRequestDto,
    CreateUpdateProductDto,
    CreateUpdateProductDto>
{
    Task<PagedResultDto<ProductDto>> GetListAsync(GetProductsInput input);
}