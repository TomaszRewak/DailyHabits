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

		[HttpPut]
		public JsonResult Create([FromBody]CreateHabitRequest request)
		{
			var response = _habitService.CreateHabit(request);

			return ServiceResponse(response);
		}

		[HttpPost]
		public JsonResult Edit([FromBody]EditHabitRequest request)
		{
			var response = _habitService.EditHabit(request);

			return ServiceResponse(response);
		}

		[HttpDelete("{id}")]
		public JsonResult Delete(int id)
		{
			var response = _habitService.DeleteHabit(id);

			return ServiceResponse(response);
		}

		[HttpGet]
		public JsonResult Get()
		{
			var response = _habitService.ListHabits();

			return ServiceResponse(response);
		}
	}
}
