////using System;
////using System.Collections.Generic;
////using System.Linq;
////using System.Text;
////using System.Threading.Tasks;

////namespace ProductManagement
////{
////    class ProductManagementDbContext
////    {
////    }
////}

//using Microsoft.EntityFrameworkCore;
//using ProductManagement.Products;
//using Volo.Abp.EntityFrameworkCore;
//using Volo.Abp.EntityFrameworkCore.Modeling;

//namespace ProductManagement.EntityFrameworkCore
//{
//    public class ProductManagementDbContext : AbpDbContext<ProductManagementDbContext>
//    {
//        public DbSet<Product> Products { get; set; }

//        // ... existing constructor and other DbSets

//        protected override void OnModelCreating(ModelBuilder builder)
//        {
//            base.OnModelCreating(builder);

//            // ... existing configuration

//            builder.Entity<Product>(b =>
//            {
//                b.ToTable("Products");
//                b.ConfigureByConvention();

//                b.Property(x => x.Name).IsRequired().HasMaxLength(128);
//                b.Property(x => x.Description).HasMaxLength(2000);
//                b.Property(x => x.Price).HasColumnType("decimal(18,2)");
//            });
//        }
//    }
//}