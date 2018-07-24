using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Habits.Model
{
    public class ChangeHabitsOrderRequest
    {
		public int HabitId { get; set; }

		public int NewPosition { get; set; }
	}
}
