using KnProperty.Samples;
using Xunit;

namespace KnProperty.EntityFrameworkCore.Domains;

[Collection(KnPropertyTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<KnPropertyEntityFrameworkCoreTestModule>
{

}
