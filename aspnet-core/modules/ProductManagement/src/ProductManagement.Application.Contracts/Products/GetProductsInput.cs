using Volo.Abp.Application.Dtos;

namespace ProductManagement.Products;

public class GetProductsInput : PagedAndSortedResultRequestDto
{
    public string? FilterText { get; set; }
    public string? Name { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }

    //public string? ExtraProperties { get; set; }
    public ProductStatus? Status { get; set; }
}