using DailyHabits.Services.Habits;
using DailyHabits.Services.Habits.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyHabits.Web.Controllers
{
	[Route("api/habit")]
	public class HabitController : ControllerBase
	{
		private readonly IHabitService _habitService;

		public HabitController(IHabitService habitService)
		{
			_habitService = habitService;
		}

		[HttpPost("create")]
		public JsonResult Create(CreateHabitRequest request)
		{
			var response = _habitService.CreateHabit(request);

			return ServiceResponse(response);
		}

		public JsonResult Edit(EditHabitRequest request)
		{
			var response = _habitService.EditHabit(request);

			return ServiceResponse(response);
		}

		public JsonResult Delete(int habitId)
		{
			var response = _habitService.DeleteHabit(habitId);

			return ServiceResponse(response);
		}

		public JsonResult Get()
		{
			var response = _habitService.ListHabits();

			return ServiceResponse(response);
		}
	}
}
