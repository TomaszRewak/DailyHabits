using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Events.Model
{
    public class UpdateEventRequest : EventModel
	{
		public int Id { get; set; }
	}
}
