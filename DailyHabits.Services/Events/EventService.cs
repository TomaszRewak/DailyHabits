using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DailyHabits.Model;
using DailyHabits.Model.Entities;
using DailyHabits.Services.Auth;
using DailyHabits.Services.Events.Model;
using DailyHabits.Services.Habits;
using Microsoft.EntityFrameworkCore;

namespace DailyHabits.Services.Events
{
	public class EventService : ServiceBase, IEventService
	{
		private readonly DailyHabitsDataContext _dataContext;

		private readonly IAuthService _authService;
		private readonly IHabitService _habitService;

		public EventService(DailyHabitsDataContext dataContext, IAuthService authService, IHabitService habitService)
		{
			_dataContext = dataContext;
			_authService = authService;
			_habitService = habitService;
		}

		public ServiceResponse<int> CreateEvent(CreateEventRequest request)
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure<int>();

			var hasHabitResponse = _habitService.HasHabit(request.HabitId);

			if (hasHabitResponse.Failure || !hasHabitResponse.Payload)
				return Failure<int>();

			var newEvent = new Event
			{
				HabitId = request.HabitId,
				Timestamep = request.Timestamp
			};

			_dataContext.Events.Add(newEvent);

			try
			{ _dataContext.SaveChanges(); }
			catch (Exception)
			{ return Failure<int>(); }

			return Success(newEvent.Id);
		}

		public ServiceResponse DeleteEvent(int eventId)
		{
			var authResponse = _authService.GetCurrentUserId();

			if (authResponse.Failure)
				return Failure();

			var removedEvent = _dataContext
				.Events
				.Where(e => e.Id == eventId && e.Habit.UserId == authResponse.Payload)
				.FirstOrDefault();

			if (removedEvent == null)
				return Failure();

			_dataContext.Entry(removedEvent).State = EntityState.Deleted;

			try
			{ _dataContext.SaveChanges(); }
			catch (Exception)
			{ return Failure(); }

			return Success();
		}
	}
}
