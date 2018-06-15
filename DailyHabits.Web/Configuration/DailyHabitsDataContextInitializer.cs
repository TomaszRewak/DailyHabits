using DailyHabits.Model;
using DailyHabits.Model.Entities;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyHabits.Web.Configuration
{
    public class DailyHabitsDataContextInitializer
	{
		private static void Seed(DailyHabitsDataContext context)
		{
			if (!context.Users.Any())
			{
				context.Users.Add(new User
				{
					Name = "Tomasz"
				});

				context.SaveChanges();
			}
		}

		public static void Initialize(IServiceProvider serviceProvider)
		{
			using (var scope = serviceProvider.CreateScope())
			using (var context = scope.ServiceProvider.GetRequiredService<DailyHabitsDataContext>())
			{
				Seed(context);
			}
		}
	}
}
