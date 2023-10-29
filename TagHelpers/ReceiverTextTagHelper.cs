using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Collections;
using System.Resources.NetStandard;

namespace BossAutoBlackEdition.TagHelpers
{
    [HtmlTargetElement("receiver-text", Attributes = "id")]
    public class ReceiverText : TagHelper
    {
        private readonly string path = $"{Directory.GetCurrentDirectory()}\\wwwroot\\Data\\Text.resx";
        public string Id { get; set; }

        public override Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div";
            output.TagMode = TagMode.StartTagAndEndTag;

            output.Attributes.SetAttribute("id", Id);

            output.Content.AppendHtml(GetText(Id));

            return base.ProcessAsync(context, output);
        }

        private string GetText(string id)
        {
            using ResXResourceReader reader = new ResXResourceReader(path);

            foreach (DictionaryEntry entry in reader)
            {
                if (entry.Key.Equals(id))
                {
                    return entry.Value.ToString();
                }
            }
            return "Error";
        }
    }
}
