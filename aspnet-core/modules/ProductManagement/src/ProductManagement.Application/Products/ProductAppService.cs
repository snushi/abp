using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace ProductManagement.Products;

[Authorize]
public class ProductAppService :
        CrudAppService<
        Product,
        ProductDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateProductDto,
        CreateUpdateProductDto>,
    IProductAppService
{
    private readonly IProductRepository _productRepository;

    public ProductAppService(IProductRepository productRepository)
        : base(productRepository)
    {
        _productRepository = productRepository;
    }

    public override async Task<ProductDto> GetAsync(Guid id)
    {

        var product = await _productRepository.GetAsync(id);
        return ObjectMapper.Map<Product, ProductDto>(product);
    }

    public override async Task<PagedResultDto<ProductDto>> GetListAsync(PagedAndSortedResultRequestDto input)
    {
        var products = await _productRepository.GetListAsync(
            sorting: input.Sorting,
            maxResultCount: input.MaxResultCount,
            skipCount: input.SkipCount);

        var totalCount = await _productRepository.GetCountAsync();

        return new PagedResultDto<ProductDto>(
            totalCount,
            ObjectMapper.Map<List<Product>, List<ProductDto>>(products)
        );
    }

    public async Task<PagedResultDto<ProductDto>> GetListAsync(GetProductsInput input)
    {
        input.Sorting = null;

        var products = await _productRepository.GetListAsync(
            input.FilterText,
            input.Name,
            input.MinPrice,
            input.MaxPrice,
            input.Status,
            input.Sorting,
            input.MaxResultCount,
            input.SkipCount);//,
                             //input.ExtraProperties);

        var totalCount = await _productRepository.GetCountAsync(
            input.FilterText,
            input.Name,
            input.MinPrice,
            input.MaxPrice,
            input.Status);

        return new PagedResultDto<ProductDto>(
            totalCount,
            ObjectMapper.Map<List<Product>, List<ProductDto>>(products)
        );
    }

    public override async Task<ProductDto> CreateAsync(CreateUpdateProductDto input)
    {
        var product = new Product(
            GuidGenerator.Create(),
            input.Name,
            input.Description,
            input.Price,
            input.StockCount,
            input.Status
        );

        await _productRepository.InsertAsync(product);
        await UnitOfWorkManager.Current.SaveChangesAsync();

        return ObjectMapper.Map<Product, ProductDto>(product);
    }

    public override async Task<ProductDto> UpdateAsync(Guid id, CreateUpdateProductDto input)
    {
        var product = await _productRepository.GetAsync(id);

        product.Name = input.Name;
        product.Description = input.Description;
        product.Price = input.Price;
        product.StockCount = input.StockCount;
        product.Status = input.Status;

        await _productRepository.UpdateAsync(product);
        await UnitOfWorkManager.Current.SaveChangesAsync();

        return ObjectMapper.Map<Product, ProductDto>(product);
    }

    public override async Task DeleteAsync(Guid id)
    {
        await _productRepository.DeleteAsync(id);
        await UnitOfWorkManager.Current.SaveChangesAsync();
    }
}