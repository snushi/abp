using Volo.Abp.Autofac;
using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace ProductManagement;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ProductManagementHttpApiClientModule),
    typeof(AbpHttpClientIdentityModelModule)
    )]
public class ProductManagementConsoleApiClientModule : AbpModule
{

}
