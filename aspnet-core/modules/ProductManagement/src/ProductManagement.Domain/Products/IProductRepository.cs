using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace ProductManagement.Products;

public interface IProductRepository : IRepository<Product, Guid>
{
    Task<List<Product>> GetListAsync(
        string filterText = null,
        string name = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null,
        string sorting = null,
        int maxResultCount = int.MaxValue,
        int skipCount = 0,
        string? extraProperties = null,
        bool includeDetails = false);

    Task<long> GetCountAsync(
        string filterText = null,
        string name = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null);
}