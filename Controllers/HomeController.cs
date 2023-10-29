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
    }
}