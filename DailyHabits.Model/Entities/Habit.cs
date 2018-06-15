using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Model.Entities
{
    public class Habit
    {
		public int Id { get; set; }

		public string Name { get; set; }

		public int UserId { get; set; }
		public User User { get; set; }

		public IEnumerable<Event> Events { get; set; }
	}
}
