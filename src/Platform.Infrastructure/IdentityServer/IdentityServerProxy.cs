using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IdentityModel.Client;
using Newtonsoft.Json;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Utilities;
using Platform.Utilities.Helpers;

namespace Platform.Infrastructure.IdentityServer
{
    public class IdentityServerProxy : IIdentityServerProxy
    {
        private readonly IIdentityServerClient _identityServerClient;


        public IdentityServerProxy(IIdentityServerClient identityServerClient)
        {
            _identityServerClient = identityServerClient;
        }

        public async Task<TokenResponse> LoginAsync(LoginViewModel model)
        {
            Require.NotNull(model, nameof(model));

            using (var client = new HttpClient())
            {
                return await client.RequestPasswordTokenAsync(new PasswordTokenRequest
                {
                    Address = $"{AppSettingsHelper.IdentityServerUrl}/connect/token",
                    ClientId = AppSettingsHelper.ClientId,
                    ClientSecret = AppSettingsHelper.Secret,
                    Scope = AppSettingsHelper.Scope,
                    UserName = model.Email ?? default,
                    Password = model.Password ?? default
                });
            }
        }

        public async Task<TokenResponse> GoogleLoginAsync(GoogleLoginViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var customParameters = new Dictionary<string, string>
            {
                {"token_id", model.TokenId}
            };
            using (var client = new HttpClient())
            {
                return await client.RequestTokenAsync(new RefreshTokenRequest
                {
                    GrantType = "google_token",
                    Address = $"{AppSettingsHelper.IdentityServerUrl}/connect/token",
                    ClientId = AppSettingsHelper.ClientId,
                    ClientSecret = AppSettingsHelper.Secret,
                    Scope = AppSettingsHelper.Scope,
                    Parameters = customParameters
                });
            }
        }

        public async Task<TokenResponse> RefreshAsync(RefreshTokenViewModel model)
        {
            Require.NotNull(model, nameof(model));

            using (var client = new HttpClient())
            {
                return await client.RequestRefreshTokenAsync(new RefreshTokenRequest
                {
                    Address = $"{AppSettingsHelper.IdentityServerUrl}/connect/token",
                    ClientId = AppSettingsHelper.ClientId,
                    ClientSecret = AppSettingsHelper.Secret,
                    Scope = AppSettingsHelper.Scope,
                    GrantType = "refresh_token",
                    RefreshToken = model.RefreshToken ?? default
                });
            }
        }

        public async Task<TokenRevocationResponse> LogoutAsync(LogoutViewModel model)
        {
            Require.NotNull(model, nameof(model));

            using (var client = new HttpClient())
            {
                return await client.RevokeTokenAsync(new TokenRevocationRequest
                {
                    Address = $"{AppSettingsHelper.IdentityServerUrl}/connect/revocation",
                    ClientId = AppSettingsHelper.ClientId,
                    ClientSecret = AppSettingsHelper.Secret,
                    Token = model.RefreshToken,
                    TokenTypeHint = "refresh_token"
                });
            }
        }

        private async Task<HttpResponseMessage> PostRequest(object model, string url)
        {
            Require.NotNull(model, nameof(model));
            Require.NotEmpty(url, nameof(url));

            var token = await _identityServerClient.GetToken();

            var request = new HttpRequestMessage(HttpMethod.Post, url);
            request.SetBearerToken(token);
            request.Content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                return await client.SendAsync(request);
            }
        }

        #region external Api methods requires auth token

        public async Task<HttpResponseMessage> ChangeEmailAsync(SystemIdEmailModel model)
        {
            return await PostRequest(model, $"{AppSettingsHelper.IdentityServerUrl}/connect/email");
        }

        public async Task<HttpResponseMessage> GoogleRegisterAsync(GoogleRegisterViewModel model)
        {
            return await PostRequest(model, $"{AppSettingsHelper.IdentityServerUrl}/connect/googleregister");
        }

        public async Task<HttpResponseMessage> RegisterAsync(RegisterViewModel model)
        {
            return await PostRequest(model, $"{AppSettingsHelper.IdentityServerUrl}/connect/register");
        }

        public async Task<HttpResponseMessage> RegisterRangeAsync(params RegisterViewModel[] models)
        {
            return await PostRequest(models, $"{AppSettingsHelper.IdentityServerUrl}/connect/registerrange");
        }

        #endregion
    }
}