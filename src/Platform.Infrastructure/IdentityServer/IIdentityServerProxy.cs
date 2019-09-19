using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using Platform.Infrastructure.ViewModels.Account;

namespace Platform.Infrastructure.IdentityServer
{
    public interface IIdentityServerProxy
    {
        Task<HttpResponseMessage> ChangeEmailAsync(SystemIdEmailModel model);
        Task<HttpResponseMessage> GoogleRegisterAsync(GoogleRegisterViewModel model);
        Task<HttpResponseMessage> RegisterAsync(RegisterViewModel model);
        Task<HttpResponseMessage> RegisterRangeAsync(params RegisterViewModel[] models);
        Task<TokenResponse> LoginAsync(LoginViewModel model);
        Task<TokenResponse> GoogleLoginAsync(GoogleLoginViewModel model);
        Task<TokenResponse> RefreshAsync(RefreshTokenViewModel model);
        Task<TokenRevocationResponse> LogoutAsync(LogoutViewModel model);
    }
}