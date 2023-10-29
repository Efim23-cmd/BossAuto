using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Collections;
using System.Resources.NetStandard;
using BossAutoBlackEdition.Models;
using System.Text.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Runtime.Intrinsics.X86;
using static System.Net.Mime.MediaTypeNames;
using System.IO;

namespace BossAutoBlackEdition.Controllers
{
    public class AdminController : Controller
    {
        private readonly ILogger logger;

        public AdminController()
        {
            ILoggerFactory loggerFactory = LoggerFactory.Create(builder => builder.AddFile($"{Directory.GetCurrentDirectory()}\\wwwroot\\Data\\Log.txt"));
            logger = loggerFactory.CreateLogger("Admin");
        }

        [Route("/Login")]
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult ChangerBars()
        {
            return PartialView();
        }

        [Route("/Admin")]
        [Authorize]
        public IActionResult Index()
        {
            return View(true);
        }

        [Route("/Admin/CheckAuthorization")]
        public async Task<IActionResult> CheckAuthorization(User user)
        {      
            try {    
                var users = await Users.GetListUsersAsync();

                User activeUser = users.FirstOrDefault(entry => entry.Name == user.Name && entry.Password == user.Password);

                if (activeUser is not null)
                {
                    List<Claim> claims = new List<Claim>() {
                        new Claim(ClaimTypes.Name, activeUser.Name),
                        new Claim(ClaimsIdentity.DefaultRoleClaimType, activeUser.Role)
                    };
                    ClaimsIdentity identity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
                    return Ok();
                }
            }
            catch
            {
                HttpContext.Response.StatusCode = 399;
                return Json("Error");
            }
            HttpContext.Response.StatusCode = 399;
            return Json("Неверный логин или пароль!");
        }

        [Authorize(Roles = "Admin")]
        [Route("/Admin/getLog")]
        public IActionResult GetLog()
        {
            HttpContext.Response.Headers.ContentDisposition = "attachment";
            return PhysicalFile($"{Directory.GetCurrentDirectory()}\\wwwroot\\Data\\Log.txt", "text/plain", "Отчет.txt");
        }

        [Authorize]
        [Route("/Admin/SetText")]
        [HttpPost]
        public IActionResult SetText()
        {
            if (HttpContext.User.IsInRole("Admin"))
            {
                var Id = HttpContext.Request.Form["Id"];
                var Text = HttpContext.Request.Form["text"];

                LogToFile(HttpContext.User.Identity.Name, Id, Text);

                string path = $"{Directory.GetCurrentDirectory()}\\wwwroot\\Data\\Text.resx";
                try
                {
                    Rewrite(path, Id, Text);
                }
                catch
                {
                    HttpContext.Response.StatusCode = 399;
                    return Json("Error");
                }
                HttpContext.Response.StatusCode = 200;
                return Json("Ok");
            }
            HttpContext.Response.StatusCode = 399;
            return Json("Not enough rights!");
        }

        [Authorize]
        [Route("/Admin/SetImg")]
        [HttpPost]
        public IActionResult SetImg()
        {
            if (HttpContext.User.IsInRole("Admin"))
            { 
                var Id = HttpContext.Request.Form["Id"];
                var Image = HttpContext.Request.Form.Files["image"];

                LogToFile(HttpContext.User.Identity.Name, Id, Image.FileName);

                string path = $"{Directory.GetCurrentDirectory()}\\wwwroot\\css\\Resource\\Images\\";
                string pathResx = $"{Directory.GetCurrentDirectory()}\\wwwroot\\Data\\ImgNames.resx";
                try
                {
                    System.IO.File.Delete(path + GetValue(pathResx, Id));

                    Rewrite(pathResx, Id, Image.FileName);

                    using (FileStream stream = new FileStream(path + Image.FileName, FileMode.Create))
                    {
                        Image.CopyTo(stream);
                    }
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    HttpContext.Response.StatusCode = 399;
                    return Json("Error");
                }
                HttpContext.Response.StatusCode = 200;
                return Json("Ok");
            }
            HttpContext.Response.StatusCode = 399;
            return Json("Not enough rights!");
        }

        [NonAction]
        private void Rewrite(string pathResx, string id, string text)
        {
            var resorces = new Dictionary<string, string>();
            using (ResXResourceReader reader = new ResXResourceReader(pathResx))
            {
                foreach (DictionaryEntry resorce in reader)
                {
                    resorces.Add(resorce.Key.ToString(), resorce.Value.ToString());
                }
            }

            resorces[id!] = text!;

            using (ResXResourceWriter writer = new ResXResourceWriter(pathResx))
            {
                foreach (var resorce in resorces)
                {
                    writer.AddResource(resorce.Key, resorce.Value);
                }
            }
        }

        [NonAction]
        private string GetValue(string pathResx,string id)
        {
            using ResXResourceReader reader = new ResXResourceReader(pathResx);

            foreach (DictionaryEntry entry in reader)
            {
                if (entry.Key.Equals(id))
                {
                    return entry.Value.ToString();
                }
            }
            return "Error";
        }

        [NonAction]
        private void LogToFile(string name, string Id, string Text)
        {
            logger.LogInformation($"""

                                    Name: {name}, 
                                        id: {Id}, 
                                        text: {Text},
                                    time: {DateTime.Now}

                                    """);
        }   
    }

    [NonController]
    static class Users 
    {
        public static async Task<User[]> GetListUsersAsync()
        {
            try
            {
                using (FileStream fs = new FileStream($"{Directory.GetCurrentDirectory()}\\wwwroot\\config.json", FileMode.Open))
                {
                    return await JsonSerializer.DeserializeAsync<User[]>(fs);
                }
            }
            catch
            {
                return new User[] { new User() };
            }
        }
    }
}
