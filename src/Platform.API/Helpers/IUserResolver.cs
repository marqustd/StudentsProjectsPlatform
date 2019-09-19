using System.Security.Claims;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;

namespace Platform.API.Helpers
{
    public interface IUserResolver
    {
        Task<T> GetUserAsync<T>(ClaimsPrincipal claimsPrincipal) where T : User;
    }
}