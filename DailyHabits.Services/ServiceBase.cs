using System;
using System.Collections.Generic;
using System.Text;

namespace DailyHabits.Services
{
	public class ServiceResponse
	{
		public bool Success { get; set; }

		public bool Failure => !Success;
	}

	public class ServiceResponse<T> : ServiceResponse
	{
		public T Payload { get; set; }
	}

	public abstract class ServiceBase
	{
		protected ServiceResponse Success() => new ServiceResponse() { Success = true };
		protected ServiceResponse Failure() => new ServiceResponse() { Success = false };
		protected ServiceResponse<T> Success<T>(T data) => new ServiceResponse<T>() { Success = true, Payload = data };
		protected ServiceResponse<T> Failure<T>() => new ServiceResponse<T>() { Success = false };
	}
}
