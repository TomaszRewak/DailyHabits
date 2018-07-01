using DailyHabits.Services.Events.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Events
{
    public interface IEventService
    {
		ServiceResponse<int> CreateEvent(CreateEventRequest request);

		ServiceResponse DeleteEvent(int eventId);

		ServiceResponse<IEnumerable<GetEventResponse>> ListEvents(DateTime from, DateTime to);
    }
}
