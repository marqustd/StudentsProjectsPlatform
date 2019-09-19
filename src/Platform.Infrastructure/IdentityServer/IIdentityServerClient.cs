using System.Threading.Tasks;

namespace Platform.Infrastructure.IdentityServer
{
    public interface IIdentityServerClient
    {
        Task<string> GetToken();
    }
}