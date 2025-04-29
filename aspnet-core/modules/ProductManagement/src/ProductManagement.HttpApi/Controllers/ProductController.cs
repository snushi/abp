//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ProductManagement.Controller
//{
//    class ProductController
//    {
//    }
//}

using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagement.Products;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace ProductManagement.Controllers;

[RemoteService(Name = "ProductManagement")]
[Route("api/product-management/products")]
[AllowAnonymous]
public class ProductController : ProductManagementController
{
    private readonly IProductAppService _productAppService;

    public ProductController(IProductAppService productAppService)
    {
        _productAppService = productAppService;
    }

    [HttpGet]
    public async Task<PagedResultDto<ProductDto>> GetListAsync(GetProductsInput input)
    {
        return await _productAppService.GetListAsync(input);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ProductDto> GetAsync(Guid id)
    {
        var result = await _productAppService.GetAsync(id);
        return result;
    }

    [HttpPost]
    public async Task<ProductDto> CreateAsync(CreateUpdateProductDto input)
    {
        var resutl = await _productAppService.CreateAsync(input);
        return resutl;
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<ProductDto> UpdateAsync(Guid id, CreateUpdateProductDto input)
    {
        return await _productAppService.UpdateAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task DeleteAsync(Guid id)
    {
        await _productAppService.DeleteAsync(id);
    }
}