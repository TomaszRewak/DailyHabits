using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Habits.Model
{
    public abstract class HabitModel
	{
		public string Name { get; set; }
		public string Icon { get; set; }

		public string BaseColor { get; set; }
		public string InitialColor { get; set; }
		public string FinalColor { get; set; }

		public int Target { get; set; }
	}
}
