using System;
using IdentityModel.Client;
using Microsoft.Extensions.DependencyInjection;
using Platform.Infrastructure.IdentityServer;
using Platform.Utilities.Helpers;

namespace Platform.API.Services
{
    public static class Register
    {
        public static void RegisterIdentityServerClient(this IServiceCollection services)
        {
            services.AddSingleton(new ClientCredentialsTokenRequest
            {
                Address = AppSettingsHelper.IdentityServerConnectUrl,
                ClientId = AppSettingsHelper.ClientId,
                ClientSecret = AppSettingsHelper.Secret,
                Scope = AppSettingsHelper.ISLocalApiScope
            });

            services.AddHttpClient<IIdentityServerClient, IdentityServerClient>(client =>
            {
                client.BaseAddress = new Uri(AppSettingsHelper.IdentityServerUrl);
            });
        }
    }
}