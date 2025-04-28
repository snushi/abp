using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProductManagement.EntityFrameworkCore;
using ProductManagement.Products;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace YourCompany.ProductManagement.Products;

public class EfCoreProductRepository : EfCoreRepository<ProductManagementDbContext, Product, Guid>, IProductRepository
{
    public EfCoreProductRepository(IDbContextProvider<ProductManagementDbContext> dbContextProvider) : base(dbContextProvider)
    { }

    public async Task<Product?> GetAsync(Guid productId)
    {
        var query = await GetQueryableAsync();

        var result = await query.Select(x => new Product(x.Id, x.Name, x.Description, x.Price, x.StockCount, ProductStatus.Active))
            .Where(x => x.Id == productId).ToListAsync();
        //.PageBy(skipCount, maxResultCount).ToListAsync();
        //if (status == null)
        //{
        //    status = ProductStatus.Active;
        //}

        //int? statusValue = null;
        //if (status != null)
        //{
        //    statusValue = (int)status;//ProductStatus.Active;
        //}
        return result.FirstOrDefault();
    }

    public async Task<List<Product>> GetListAsync(
        string filterText = null,
        string name = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null,
        string sorting = null,
        int maxResultCount = int.MaxValue,
        int skipCount = 0,
        string? extraProperties = null,
        bool includeDetails = false)
    {
        //var query = ApplyFilter(await GetQueryableAsync(), filterText, name, minPrice, maxPrice, status);

        if (status == null)
        {
            status = ProductStatus.Active;
        }

        int? statusValue = null;
        if (status != null)
        {
            statusValue = (int)status;//ProductStatus.Active;
        }

        var query = ApplyFilter(await GetQueryableAsync(), filterText, name, minPrice, maxPrice, statusValue);

        var result = await query.Select(x => new Product(x.Id, x.Name, x.Description, x.Price, x.StockCount, ProductStatus.Active))
            .PageBy(skipCount, maxResultCount).ToListAsync();

        //query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? "name asc" : sorting);

        //return await query.PageBy(skipCount, maxResultCount).ToListAsync();

        return result;
    }

    public async Task<long> GetCountAsync(
        string filterText = null,
        string name = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null)
    {
        if (status == null)
        {
            status = ProductStatus.Active;
        }

        int? statusValue = null;
        if (status != null)
        {
            statusValue = (int)status;//ProductStatus.Active;
        }

        var query = ApplyFilter(await GetQueryableAsync(), filterText, name, minPrice, maxPrice, statusValue);

        return await query.LongCountAsync();
    }

    protected virtual IQueryable<Product> ApplyFilter(
    IQueryable<Product> query,
    string filterText,
    string name = null,
    decimal? minPrice = null,
    decimal? maxPrice = null,
    int? status = null)
    {
        return query
        .WhereIf(!string.IsNullOrWhiteSpace(filterText), x => x.Name.Contains(filterText) || x.Description.Contains(filterText))
        .WhereIf(!string.IsNullOrWhiteSpace(name), x => x.Name.Contains(name))
        .WhereIf(minPrice.HasValue, x => x.Price >= minPrice.Value)
        .WhereIf(maxPrice.HasValue, x => x.Price <= maxPrice.Value)
        .WhereIf(status.HasValue, x => (int)x.Status == status);
    }
}