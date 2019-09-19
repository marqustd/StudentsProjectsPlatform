using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;

namespace Platform.API.Helpers
{
    public class UserResolver : IUserResolver
    {
        private readonly PlatformDbContext _db;

        public UserResolver(PlatformDbContext db)
        {
            _db = db;
        }

        public async Task<T> GetUserAsync<T>(ClaimsPrincipal claimsPrincipal) where T : User
        {
            var systemId = claimsPrincipal.Claims.SingleOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrWhiteSpace(systemId))
            {
                return null;
            }

            return await _db.Set<T>().SingleOrDefaultAsync(u => u.SystemId.Equals(systemId));
        }
    }
}