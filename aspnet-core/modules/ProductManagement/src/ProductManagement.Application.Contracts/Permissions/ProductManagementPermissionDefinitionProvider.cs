using ProductManagement.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace ProductManagement.Permissions;

public class ProductManagementPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var productManagementGroup = context.AddGroup(ProductManagementPermissions.GroupName);

        var productsPermission = productManagementGroup.AddPermission(
            ProductManagementPermissions.Products.Default,
            L("Permission:Products"));

        productsPermission.AddChild(
            ProductManagementPermissions.Products.Create,
            L("Permission:Products.Create"));

        productsPermission.AddChild(
            ProductManagementPermissions.Products.Edit,
            L("Permission:Products.Edit"));

        productsPermission.AddChild(
            ProductManagementPermissions.Products.Delete,
            L("Permission:Products.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ProductManagementResource>(name);
    }
}