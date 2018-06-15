using DailyHabits.Model;
using DailyHabits.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DailyHabits.Services.Auth
{
	public class AuthService : ServiceBase, IAuthService
	{
		private readonly DailyHabitsDataContext _dataContext;

		public AuthService(DailyHabitsDataContext dataContext)
		{
			_dataContext = dataContext;
		}

		public ServiceResponse<int> GetCurrentUserId()
		{
			int? userId = _dataContext
				.Users
				.Where(user => user.Name == "Tomasz")
				.Select<User, int?>(user => user.Id)
				.FirstOrDefault();

			if (!userId.HasValue)
				return Failure<int>();

			return Success(userId.Value);
		}
	}
}
