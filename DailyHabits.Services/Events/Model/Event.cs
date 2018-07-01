using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Events.Model
{
    public abstract class EventModel
    {
		public int HabitId { get; set; }

		public DateTime Timestamp { get; set; }
	}
}
