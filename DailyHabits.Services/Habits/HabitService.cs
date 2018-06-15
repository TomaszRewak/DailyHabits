using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DailyHabits.Model;
using DailyHabits.Model.Entities;
using DailyHabits.Services.Auth;
using DailyHabits.Services.Habits.Model;
using Microsoft.EntityFrameworkCore;

namespace DailyHabits.Services.Habits
{
	public class HabitService : ServiceBase, IHabitService
	{
		private readonly DailyHabitsDataContext _dataContext;

		private readonly IAuthService _authService;

		public HabitService(DailyHabitsDataContext dataContext, IAuthService authService)
		{
			_dataContext = dataContext;
			_authService = authService;
		}

		public ServiceResponse<int> CreateHabit(CreateHabitRequest request)
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure<int>();

			var newHabit = new Habit
			{
				Name = request.Name,
				UserId = authResponse.Payload
			};

			_dataContext.Habits.Add(newHabit);

			try
			{ _dataContext.SaveChanges(); }
			catch (Exception)
			{ return Failure<int>(); }

			return Success(newHabit.Id);
		}

		public ServiceResponse DeleteHabit(int habitId)
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure();

			var removedHabit = _dataContext
				.Habits
				.Where(habit => habit.Id == habitId && habit.UserId == authResponse.Payload)
				.FirstOrDefault();

			if (removedHabit == null)
				return Failure();

			_dataContext.Entry(removedHabit).State = EntityState.Deleted;

			try
			{ _dataContext.SaveChanges(); }
			catch (Exception)
			{ return Failure(); }

			return Success();
		}

		public ServiceResponse EditHabit(EditHabitRequest request)
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure();

			var editedHabit = _dataContext
				.Habits
				.Where(habit => habit.Id == request.Id && habit.UserId == authResponse.Payload)
				.FirstOrDefault();

			if (editedHabit == null)
				return Failure();

			editedHabit.Name = request.Name;

			try
			{ _dataContext.SaveChanges(); }
			catch (Exception)
			{ return Failure(); }

			return Success();
		}

		public ServiceResponse<bool> HasHabit(int habitId)
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure<bool>();

			var hasHabit = _dataContext
				.Habits
				.Where(habit => habit.Id == habitId && habit.UserId == authResponse.Payload)
				.Any();

			return Success(hasHabit);
		}

		public ServiceResponse<IEnumerable<GetHabitResponse>> ListHabits()
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure<IEnumerable<GetHabitResponse>>();

			var habits = _dataContext
				.Habits
				.Where(habit => habit.UserId == authResponse.Payload)
				.Select(habit => new GetHabitResponse {
					Id = habit.Id,
					Name = habit.Name
				})
				.ToList();

			return Success(habits as IEnumerable<GetHabitResponse>);
		}
	}
}
