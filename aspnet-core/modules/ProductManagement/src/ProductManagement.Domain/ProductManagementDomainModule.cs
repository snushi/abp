using Volo.Abp.Domain;
using Volo.Abp.Modularity;

namespace ProductManagement;

[DependsOn(
    typeof(AbpDddDomainModule),
    typeof(ProductManagementDomainSharedModule)
)]
public class ProductManagementDomainModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        //Configure<AbpPermissionOptions>(options =>
        //{
        //    options.DefinitionProviders.Add<ProductPermissionDefinitionProvider>();
        //});

        // Other configurations...
    }
}
