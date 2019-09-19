using Microsoft.Extensions.Configuration;

namespace Platform.Utilities.Helpers
{
    public static class AppSettingsHelper
    {
        public static string GoogleId { get; private set; }
        public static string GoogleSecret { get; private set; }
        public static string ClientUrl { get; private set; }
        public static string IdentityServerUrl { get; private set; }
        public static string IdentityServerConnectUrl { get; private set; }
        public static string ApiScopeName { get; private set; }
        public static string Secret { get; private set; }
        public static string ISLocalApiScope { get; private set; }
        public static string ClientId { get; private set; }
        public static string Scope { get; private set; }
        public static ArtifactsSettings ArtifactSettings { get; set; }

        public static void Init(IConfiguration configuration)
        {
            ClientUrl = configuration["Urls:Client"];
            IdentityServerUrl = configuration["Urls:IdentityServer"];
            IdentityServerConnectUrl = configuration["Urls:IdenityServerAuthUrl"];
            ApiScopeName = configuration["Security:ApiName"];
            Secret = configuration["Security:Secret"];
            ISLocalApiScope = configuration["Security:ISLocalApiScope"];
            ClientId = configuration["Security:ClientId"];
            Scope = configuration["Security:Scope"];
            GoogleId = configuration["Security:External:Google:client_id"];
            GoogleSecret = configuration["Security:External:Google:client_secret"];
            ArtifactSettings = new ArtifactsSettings(
                configuration["Artifact:MaximumFileSize"],
                configuration["Artifact:ServerDirectory"]);
        }
    }
}