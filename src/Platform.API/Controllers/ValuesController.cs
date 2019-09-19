using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Platform.API.Controllers
{
    /// <summary>
    ///     Controller made for tests
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : Controller
    {
        // GET api/values/auth
        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<string>> Auth()
        {
            var cnt = HttpContext;
            return Json(new {Message = "It is Authorized content."});
        }

        // GET api/values/admin
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public ActionResult Admin()
        {
            var cnt = HttpContext;
            return Json(new {Message = "It is Admin's content."});
        }

        // GET api/values/hello        
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<string> Hello()
        {
            var cnt = HttpContext;
            return Json(new {Message = "Hello World!"});
        }
    }
}