using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Events.Model
{
    public abstract class ManageEventRequest
    {
		public int HabitId { get; set; }

		public DateTime Timestamp { get; set; }
	}
}
