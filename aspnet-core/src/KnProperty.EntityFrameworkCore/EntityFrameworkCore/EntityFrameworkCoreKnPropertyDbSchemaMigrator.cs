using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using KnProperty.Data;
using Volo.Abp.DependencyInjection;

namespace KnProperty.EntityFrameworkCore;

public class EntityFrameworkCoreKnPropertyDbSchemaMigrator
    : IKnPropertyDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreKnPropertyDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the KnPropertyDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<KnPropertyDbContext>()
            .Database
            .MigrateAsync();
    }
}
