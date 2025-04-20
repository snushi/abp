using Volo.Abp.Modularity;

namespace KnProperty;

/* Inherit from this class for your domain layer tests. */
public abstract class KnPropertyDomainTestBase<TStartupModule> : KnPropertyTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
