using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace KnProperty.Data;

/* This is used if database provider does't define
 * IKnPropertyDbSchemaMigrator implementation.
 */
public class NullKnPropertyDbSchemaMigrator : IKnPropertyDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
