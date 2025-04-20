using Volo.Abp.Settings;

namespace KnProperty.Settings;

public class KnPropertySettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(KnPropertySettings.MySetting1));
    }
}
