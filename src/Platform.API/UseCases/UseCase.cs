using System.IO;
using Microsoft.AspNetCore.Mvc;
using Platform.Infrastructure.Models;

namespace Platform.API.UseCases
{
    public abstract class UseCase
    {
        protected IActionResult Ok<T>(ApiJsonResponse<T> response) where T : class
        {
            return new OkObjectResult(response);
        }

        protected IActionResult Ok(ApiJsonResponse response)
        {
            return new OkObjectResult(response);
        }

        protected IActionResult BadRequest<T>(ApiJsonResponse<T> response) where T : class
        {
            return new BadRequestObjectResult(response);
        }

        protected IActionResult BadRequest(ApiJsonResponse response)
        {
            return new BadRequestObjectResult(response);
        }

        protected IActionResult File(Stream stream, string contentType)
        {
            return new FileStreamResult(stream, contentType);
        }
    }
}