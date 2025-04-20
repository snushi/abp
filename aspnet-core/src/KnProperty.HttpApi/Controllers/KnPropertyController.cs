using KnProperty.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace KnProperty.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class KnPropertyController : AbpControllerBase
{
    protected KnPropertyController()
    {
        LocalizationResource = typeof(KnPropertyResource);
    }
}
