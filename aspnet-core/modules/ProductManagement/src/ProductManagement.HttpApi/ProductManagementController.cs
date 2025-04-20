using ProductManagement.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace ProductManagement;

public abstract class ProductManagementController : AbpControllerBase
{
    protected ProductManagementController()
    {
        LocalizationResource = typeof(ProductManagementResource);
    }
}
