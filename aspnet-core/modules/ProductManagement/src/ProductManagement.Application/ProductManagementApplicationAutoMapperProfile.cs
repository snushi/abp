//using AutoMapper;

//namespace ProductManagement;

//public class ProductManagementApplicationAutoMapperProfile : Profile
//{
//    public ProductManagementApplicationAutoMapperProfile()
//    {
//        /* You can configure your AutoMapper mapping configuration here.
//         * Alternatively, you can split your mapping configurations
//         * into multiple profile classes for a better organization. */
//    }
//}
using AutoMapper;
using ProductManagement.Products;

namespace ProductManagement;

public class ProductManagementApplicationAutoMapperProfile : Profile
{
    public ProductManagementApplicationAutoMapperProfile()
    {
        // Add your existing mappings...

        // Product mappings
        CreateMap<Product, ProductDto>();
        CreateMap<CreateUpdateProductDto, Product>();
    }
}