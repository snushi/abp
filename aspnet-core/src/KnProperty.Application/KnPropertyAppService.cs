using System;
using System.Collections.Generic;
using System.Text;
using KnProperty.Localization;
using Volo.Abp.Application.Services;

namespace KnProperty;

/* Inherit your application services from this class.
 */
public abstract class KnPropertyAppService : ApplicationService
{
    protected KnPropertyAppService()
    {
        LocalizationResource = typeof(KnPropertyResource);
    }
}
