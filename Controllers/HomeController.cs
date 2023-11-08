using BossAutoBlackEdition.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Diagnostics;
using System.Resources.NetStandard;
using System.Text;

namespace BossAutoBlackEdition.Controllers
{
    public class HomeController : Controller
    {
        [Route("/")]
        public IActionResult Index()
        {
            return View(false);
        }
        public IActionResult NotFoundPage()
        {
            return Content($"<h3>Not Found Page: {HttpContext.Request.Path} 😭</h3>", "text/html", contentEncoding: Encoding.Unicode);
        }
        [Route("/sitemap.xml")]
        public IActionResult SitemapXml()
        {
            return new VirtualFileResult("sitemap.xml", "application/xml");
        }
        [Route("/robots.txt")]
        public IActionResult RobotsTxt()
        {
            return new VirtualFileResult("robots.txt", "text/txt");
        }
        [Route("/tableau.json")]
        public IActionResult Tableau()
        {
            return new VirtualFileResult("tableau.json", "application/json");
        }
    }
}