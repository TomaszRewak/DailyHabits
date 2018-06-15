using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DailyHabits.Web.Configuration;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace DailyHabits.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
			var host = CreateWebHostBuilder(args).Build();

			DailyHabitsDataContextInitializer.Initialize(host.Services);

			host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
