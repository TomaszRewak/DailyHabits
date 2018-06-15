using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Model.Entities
{
    public class User
    {
		public int Id { get; set; }

		public string Name { get; set; }

		public IEnumerable<Habit> Habits { get; set; }
	}
}
