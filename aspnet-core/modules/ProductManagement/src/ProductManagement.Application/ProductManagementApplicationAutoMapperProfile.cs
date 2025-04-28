using AutoMapper;
using ProductManagement.Products;

namespace ProductManagement;

public class ProductManagementApplicationAutoMapperProfile : Profile
{
    public ProductManagementApplicationAutoMapperProfile()
    {
        // Add your existing mappings...

        // Product mappings
        CreateMap<Product, ProductDto>().ForMember(dest => dest.ConcurrencyStamp, opt => opt.MapFrom(src => src.ConcurrencyStamp));
        CreateMap<CreateUpdateProductDto, Product>();
    }
}