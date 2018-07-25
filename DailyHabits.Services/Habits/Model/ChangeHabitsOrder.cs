using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Habits.Model
{
    public class ChangeHabitsOrderRequest
    {
		public int Id { get; set; }

		public int Position { get; set; }
	}
}
