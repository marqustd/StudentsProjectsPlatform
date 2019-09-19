using System;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;

namespace Platform.Infrastructure.IdentityServer
{
    public class IdentityServerClient : IIdentityServerClient
    {
        private readonly HttpClient _httpClient;
        private readonly ClientCredentialsTokenRequest _tokenRequest;

        public IdentityServerClient(
            HttpClient httpClient,
            ClientCredentialsTokenRequest tokenRequest)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _tokenRequest = tokenRequest ?? throw new ArgumentNullException(nameof(tokenRequest));
        }

        public async Task<string> GetToken()
        {
            // request the access token token
            var tokenResponse = await _httpClient.RequestClientCredentialsTokenAsync(_tokenRequest);
            if (tokenResponse.IsError)
            {
                throw new HttpRequestException("Something went wrong while requesting the access token");
            }

            return tokenResponse.AccessToken;
        }
    }
}