using Xunit;

namespace KnProperty.EntityFrameworkCore;

[CollectionDefinition(KnPropertyTestConsts.CollectionDefinitionName)]
public class KnPropertyEntityFrameworkCoreCollection : ICollectionFixture<KnPropertyEntityFrameworkCoreFixture>
{

}
