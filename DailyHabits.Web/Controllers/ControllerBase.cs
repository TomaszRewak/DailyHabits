using DailyHabits.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyHabits.Web.Controllers
{
	public class ApiResponse
	{
		public bool Success { get; set; }
	}

	public class ApiResponse<T> : ApiResponse
	{
		public T Payload { get; set; }
	}

	public class ControllerBase : Controller
	{
		protected JsonResult ServiceResponse(ServiceResponse response) => Json(new ApiResponse() { Success = response.Success });
		protected JsonResult ServiceResponse<T>(ServiceResponse<T> response) => Json(new ApiResponse<T>() { Success = response.Success, Payload = response.Payload });

		protected JsonResult Success() => Json(new ApiResponse() { Success = true });
		protected JsonResult Failure() => Json(new ApiResponse() { Success = false });
		protected JsonResult Success<T>(T data) => Json(new ApiResponse<T>() { Success = true, Payload = data });
		protected JsonResult Failure<T>() => Json(new ApiResponse<T>() { Success = false });
	}
}
