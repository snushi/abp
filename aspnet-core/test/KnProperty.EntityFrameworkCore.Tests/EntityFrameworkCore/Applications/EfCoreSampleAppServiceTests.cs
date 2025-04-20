using KnProperty.Samples;
using Xunit;

namespace KnProperty.EntityFrameworkCore.Applications;

[Collection(KnPropertyTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<KnPropertyEntityFrameworkCoreTestModule>
{

}
