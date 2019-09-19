using System;
using Microsoft.AspNetCore.Mvc;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;

namespace Platform.API.Controllers.Abstracts
{
    [ApiController]
    public abstract class PlatformController : Controller
    {
        protected const string UNKNOWN_ERROR = "Unknown error has occured.";

        protected new IActionResult Unauthorized()
        {
            return Unauthorized(new ApiJsonError
            {
                Code = (int) ApiJsonErrorCodes.Unauthorized,
                Message = "You are not authorized to perform this action"
            });
        }

        protected IActionResult BadRequest(ArgumentNullException e)
        {
            return BadRequest(new ApiJsonResponse(
                new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.BadRequest,
                    Message = $"{e.ParamName} is null",
                    Location = e.Source,
                    LocationType = e.ParamName,
                    Type = typeof(ArgumentNullException).Name
                }));
        }

        protected IActionResult BadRequest(ArgumentException e)
        {
            return BadRequest(new ApiJsonResponse(new ApiJsonError
            {
                Code = (int) ApiJsonErrorCodes.BadRequest,
                Location = e.Source,
                LocationType = e.ParamName,
                Message = $"Problem with argument {e.ParamName}",
                Type = typeof(ArgumentException).Name
            }));
        }

        protected IActionResult Forbidden()
        {
            return StatusCode(403, new ApiJsonError
            {
                Code = (int) ApiJsonErrorCodes.Forbidden,
                Message = "You are not authorized to perform this action"
            });
        }

        protected IActionResult BadRequest(Exception e)
        {
            return BadRequest(new ApiJsonResponse(new ApiJsonError
            {
                Location = e.Source,
                Message = UNKNOWN_ERROR,
                Type = e.GetType().Name,
                Code = (int) ApiJsonErrorCodes.Unknown
            }));
        }

        protected IActionResult HandleException(Exception e)
        {
            switch (e)
            {
                case ConflictException ex: return Conflict(ex);
                case NotFoundException ex: return NotFound(ex);
                case ArgumentNullException ex: return BadRequest(ex);
                case ArgumentException ex: return BadRequest(ex);
                default: return BadRequest(e);
            }
        }

        protected IActionResult Conflict(ConflictException e)
        {
            return Conflict(new ApiJsonResponse(new ApiJsonError
            {
                Code = (int) ApiJsonErrorCodes.Conflict,
                Location = e.Source,
                Message = e.Message
            }));
        }

        protected IActionResult NotFound(NotFoundException e)
        {
            return NotFound(new ApiJsonResponse(
                new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.NotFound,
                    Message = e.Message,
                    Location = e.Source
                }));
        }
    }
}