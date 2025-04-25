//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ProductManagement.Products
//{
//    class EfCoreProductRepository
//    {
//    }
//}


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

public class EfCoreProductRepository
    : EfCoreRepository<ProductManagementDbContext, Product, Guid>,
        IProductRepository
{
    public EfCoreProductRepository(
        IDbContextProvider<ProductManagementDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
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
        bool includeDetails = false)
    {
        var query = ApplyFilter(await GetQueryableAsync(), filterText, name, minPrice, maxPrice, status);

        query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? "name asc" : sorting);

        return await query.PageBy(skipCount, maxResultCount).ToListAsync();
    }

    public async Task<long> GetCountAsync(
        string filterText = null,
        string name = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null)
    {
        var query = ApplyFilter(await GetQueryableAsync(), filterText, name, minPrice, maxPrice, status);

        return await query.LongCountAsync();
    }

    protected virtual IQueryable<Product> ApplyFilter(
        IQueryable<Product> query,
        string filterText,
        string name = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null)
    {
        return query
            .WhereIf(!string.IsNullOrWhiteSpace(filterText), x => x.Name.Contains(filterText) || x.Description.Contains(filterText))
            .WhereIf(!string.IsNullOrWhiteSpace(name), x => x.Name.Contains(name))
            .WhereIf(minPrice.HasValue, x => x.Price >= minPrice.Value)
            .WhereIf(maxPrice.HasValue, x => x.Price <= maxPrice.Value)
            .WhereIf(status.HasValue, x => x.Status == status.Value);
    }
}