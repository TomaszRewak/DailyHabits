using DailyHabits.Services.Habits.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Habits
{
    public interface IHabitService
    {
		ServiceResponse<int> CreateHabit(CreateHabitRequest request);

		ServiceResponse EditHabit(EditHabitRequest request);

		ServiceResponse DeleteHabit(int habitId);

		ServiceResponse<bool> HasHabit(int habitId);

		ServiceResponse<IEnumerable<GetHabitResponse>> ListHabits();

		ServiceResponse ChangeOrder(ChangeHabitsOrderRequest request);
    }
}
