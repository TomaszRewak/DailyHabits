using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services.Auth
{
    public interface IAuthService
    {
		ServiceResponse<int> GetCurrentUserId();
    }
}
