using System.Globalization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Resources.NetStandard;
using System.Collections;
using System.Text;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions() { Args = args, WebRootPath = "wwwroot" });

        builder.Services.AddControllersWithViews();

        builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
        {
            options.AccessDeniedPath = "/AccessDenied";
            options.LoginPath = "/Login";
            options.ExpireTimeSpan = new TimeSpan(days: 0, hours: 0, minutes: 60, seconds: 0);
        });
        builder.Services.AddAuthorization();

        var app = builder.Build();

        app.UseAuthentication();
        app.UseRouting();
        app.UseAuthorization();

        app.Environment.EnvironmentName = "Development";
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler(app => app.Run(async context =>
            {
                context.Response.StatusCode = 500;
                await Results.Content("<h3>Sorry, Error Server 🤬 </h3>", "text/html", contentEncoding: Encoding.Unicode).ExecuteAsync(context);
            }));
        }

        app.MapGet("/AccessDenied", async (HttpContext context) =>
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync("Access Denied");
        });

        app.UseStaticFiles();

        app.MapControllers();

        app.MapFallbackToController("NotFoundPage", "Home");

        app.Run();
    }
}
