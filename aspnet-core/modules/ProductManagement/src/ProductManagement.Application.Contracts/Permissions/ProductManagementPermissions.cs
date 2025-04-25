//using Volo.Abp.Reflection;

//namespace ProductManagement.Permissions;

//public class ProductManagementPermissions
//{
//    public const string GroupName = "ProductManagement";

//    public static string[] GetAll()
//    {
//        return ReflectionHelper.GetPublicConstantsRecursively(typeof(ProductManagementPermissions));
//    }
//}
namespace ProductManagement.Permissions;

public static class ProductManagementPermissions
{
    public const string GroupName = "ProductManagement";

    public static class Products
    {
        public const string Default = GroupName + ".Products";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
}