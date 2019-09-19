using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Platform.IdentityServer
{
    public static class Settings
    {
        public static string ClientId { get; set; }
        public static string ClientSecret { get; set; }
        public static Dictionary<string, string> CorsUrls { get; private set; }
        public static Dictionary<string, string> EntryPoints { get; private set; }

        public static void Initialize(IConfiguration configuration)
        {
            ClientId = configuration["Security:Client:Id"];
            ClientSecret = configuration["Security:Client:Secret"];
            CorsUrls = new Dictionary<string, string>
            {
                ["Api"] = configuration["Settings:Cors:Platform"],
                ["Client"] = configuration["Settings:Cors:Client"]
            };
            EntryPoints = new Dictionary<string, string>();
        }
    }
}