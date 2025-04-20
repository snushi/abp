using KnProperty.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace KnProperty.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(KnPropertyEntityFrameworkCoreModule),
    typeof(KnPropertyApplicationContractsModule)
    )]
public class KnPropertyDbMigratorModule : AbpModule
{
}
