//using ProductManagement.Localization;
//using Volo.Abp.Authorization.Permissions;
//using Volo.Abp.Localization;

//namespace ProductManagement.Permissions;

//public class ProductPermissionDefinitionProvider : PermissionDefinitionProvider
//{
//    public override void Define(IPermissionDefinitionContext context)
//    {
//        //var productGroup = context.AddGroup("ProductManagement", L("Permission:ProductManagement"));

//        //var products = productGroup.AddPermission("Products", L("Permission:Products"));
//        //    products.AddChild("Products.Create", L("Permission:Products.Create"));
//        //    products.AddChild("Products.Read", L("Permission:Products.Read"));
//        //    products.AddChild("Products.Update", L("Permission:Products.Update"));
//        //    products.AddChild("Products.Delete", L("Permission:Products.Delete"));
//    }

//    private static LocalizableString L(string name)
//    {
//        return LocalizableString.Create<ProductManagementResource>(name);
//    }
//}
////kntodo