using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Model.Entities
{
	public class Event
	{
		public int Id { get; set; }

		public DateTime Timestamep { get; set; }

		public int HabitId { get; set; }
		public Habit Habit { get; set; }
	}
}
