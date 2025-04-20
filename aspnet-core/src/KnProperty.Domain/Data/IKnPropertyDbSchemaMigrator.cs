using System.Threading.Tasks;

namespace KnProperty.Data;

public interface IKnPropertyDbSchemaMigrator
{
    Task MigrateAsync();
}
