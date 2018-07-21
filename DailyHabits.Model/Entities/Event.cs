using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DailyHabits.Model.Entities
{
	public class Event
	{
		public int Id { get; set; }

		public DateTime Timestamep { get; set; }

		[MaxLength(256)]
		public string Description { get; set; }

		public int HabitId { get; set; }
		public Habit Habit { get; set; }
	}
}
