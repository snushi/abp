using Volo.Abp.Modularity;

namespace KnProperty;

[DependsOn(
    typeof(KnPropertyDomainModule),
    typeof(KnPropertyTestBaseModule)
)]
public class KnPropertyDomainTestModule : AbpModule
{

}
