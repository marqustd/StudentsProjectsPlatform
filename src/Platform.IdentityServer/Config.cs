using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;

namespace Platform.IdentityServer
{
    public class Config
    {
        public Config(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private static IConfiguration _configuration { get; set; }

        public IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("platform_api", "Platform API"),
                new ApiResource(IdentityServerConstants.LocalApi.ScopeName)
            };
        }

        public IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    AccessTokenLifetime = 60*60*24,
                    AllowOfflineAccess = true,
                    RefreshTokenUsage = TokenUsage.ReUse,
                    RefreshTokenExpiration = TokenExpiration.Absolute,
                    ClientId = Settings.ClientId,
                    AllowedGrantTypes = new[]
                    {
                        GrantType.ResourceOwnerPassword,
                        GrantType.ClientCredentials,
                        "google_token"
                    },
                    ClientSecrets =
                    {
                        new Secret(Settings.ClientSecret.Sha256())
                    },
                    AllowedScopes = {"platform_api", IdentityServerConstants.LocalApi.ScopeName},
                    AllowedCorsOrigins = new[]
                    {
                        Settings.CorsUrls["Client"]
                    }
                }
            };
        }
    }
}