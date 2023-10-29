using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Collections;
using System.Resources.NetStandard;

namespace BossAutoBlackEdition.TagHelpers
{
    [HtmlTargetElement("receiver-img", Attributes = "id")]
    public class ReceiverImg : TagHelper
    {
        private readonly string path = "\\css\\Resource\\Images\\";
        private readonly string pathResx = $"{Directory.GetCurrentDirectory()}\\wwwroot\\Data\\ImgNames.resx";

        public string Id { get; set; }

        public override Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "img";
            output.TagMode = TagMode.SelfClosing;

            output.Attributes.SetAttribute("id", Id);

            output.Attributes.SetAttribute("data-src", path + GetName(Id));

            return base.ProcessAsync(context, output);
        }

        private string GetName(string id)
        {
            using ResXResourceReader reader = new ResXResourceReader(pathResx);

            foreach (DictionaryEntry entry in reader)
            {
                if (entry.Key.Equals(id))
                {
                    return entry.Value.ToString();
                }
            }
            return "#";
        }
    }
}
