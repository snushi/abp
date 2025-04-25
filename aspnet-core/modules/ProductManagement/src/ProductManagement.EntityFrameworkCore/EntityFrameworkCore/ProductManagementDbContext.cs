//using Microsoft.EntityFrameworkCore;
//using ProductManagement.Products;
//using Volo.Abp.Data;
//using Volo.Abp.EntityFrameworkCore;
//using Volo.Abp.EntityFrameworkCore.Modeling;

//namespace ProductManagement.EntityFrameworkCore;

//[ConnectionStringName(ProductManagementDbProperties.ConnectionStringName)]
//public class ProductManagementDbContext : AbpDbContext<ProductManagementDbContext>//, IProductManagementDbContext kn todo
//{
//    /* Add DbSet for each Aggregate Root here. Example:
//     * public DbSet<Question> Questions { get; set; }
//     */
//    public DbSet<Product> Products { get; set; }

//    public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options)
//        : base(options)
//    {

//    }

//    protected override void OnModelCreating(ModelBuilder builder)
//    {
//        base.OnModelCreating(builder);

//        builder.Entity<Product>(b =>
//        {
//            b.ToTable("Products");
//            b.ConfigureByConvention();

//            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
//            b.Property(x => x.Description).HasMaxLength(2000);
//            b.Property(x => x.Price).HasColumnType("decimal(18,2)");
//        });

//        builder.ConfigureProductManagement();
//    }
//}


using Microsoft.EntityFrameworkCore;
using ProductManagement.Products;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;

namespace ProductManagement.EntityFrameworkCore;

public class ProductManagementDbContext : AbpDbContext<ProductManagementDbContext>
{
    public DbSet<Product> Products { get; set; }

    // ... existing constructor and other DbSets

    public ProductManagementDbContext(DbContextOptions<ProductManagementDbContext> options) : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ... existing configuration

        builder.Entity<Product>(b =>
        {
            b.ToTable("Products");
            b.ConfigureByConvention();

            b.Property(x => x.Name).IsRequired().HasMaxLength(128);
            b.Property(x => x.Description).HasMaxLength(2000);
            b.Property(x => x.Price).HasColumnType("decimal(18,2)");
        });
    }
}