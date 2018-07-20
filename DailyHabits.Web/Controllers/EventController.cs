using DailyHabits.Services.Events;
using DailyHabits.Services.Events.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyHabits.Web.Controllers
{
	[Route("api/event")]
	public class EventController : ControllerBase
    {
		private readonly IEventService _eventService;

		public EventController(IEventService eventService)
		{
			_eventService = eventService;
		}

		[HttpPut]
		public JsonResult Create([FromBody]CreateEventRequest request)
		{
			var response = _eventService.CreateEvent(request);

			return ServiceResponse(response);
		}

		[HttpDelete("{id}")]
		public JsonResult Delete(int id)
		{
			var response = _eventService.DeleteEvent(id);

			return ServiceResponse(response);
		}

		[HttpGet]
		public JsonResult Get(DateTime from, DateTime to, int window = 1)
		{
			var response = _eventService.ListEvents(from, to, window);

			return ServiceResponse(response);
		}
    }
}
