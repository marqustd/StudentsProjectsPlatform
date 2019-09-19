using Microsoft.AspNetCore.Mvc;

namespace Platform.API.Controllers.Abstracts
{
    [Route("api/[controller]/[action]")]
    public abstract class ApiController : PlatformController
    {
    }
}