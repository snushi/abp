using Volo.Abp.Modularity;

namespace KnProperty;

public abstract class KnPropertyApplicationTestBase<TStartupModule> : KnPropertyTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
