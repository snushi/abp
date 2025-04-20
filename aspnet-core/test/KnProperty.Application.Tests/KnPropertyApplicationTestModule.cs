using Volo.Abp.Modularity;

namespace KnProperty;

[DependsOn(
    typeof(KnPropertyApplicationModule),
    typeof(KnPropertyDomainTestModule)
)]
public class KnPropertyApplicationTestModule : AbpModule
{

}
