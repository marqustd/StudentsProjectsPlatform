using Microsoft.AspNetCore.Mvc;
using Platform.API.Controllers.Abstracts;
using Platform.API.Helpers;
using Platform.Infrastructure.Entities;
using Platform.Utilities;
using System.Threading.Tasks;

namespace Platform.API.Areas
{
    [Route("api/[area]/[controller]/[action]")]
    public abstract class AreaController : PlatformController
    {
        private readonly IUserResolver _userResolver = null;
        public AreaController()
        {
        }

        public AreaController(IUserResolver userResolver)
        {
            _userResolver = userResolver;
        }

        protected async Task<T> GetUser<T>() where T : User
        {
            var authorizedUser = await _userResolver.GetUserAsync<T>(User);
            Require.NotNull(authorizedUser, nameof(authorizedUser));

            return authorizedUser;
        }
    }
}