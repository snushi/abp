using Microsoft.Extensions.Localization;
using KnProperty.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace KnProperty;

[Dependency(ReplaceServices = true)]
public class KnPropertyBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<KnPropertyResource> _localizer;

    public KnPropertyBrandingProvider(IStringLocalizer<KnPropertyResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
