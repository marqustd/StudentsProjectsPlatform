using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Artifacts;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure;

namespace Platform.API.Services
{
    public static class ServicesCollection
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.RegisterInfrastructure();
            services.RegisterDomain();
            services.RegisterArtifacts();
            services.RegisterIdentityServerClient();

            services.AddTransient<UserUseCase, UserUseCase>();

            var useCases = Assembly
                .GetExecutingAssembly()
                .GetTypes()
                .Where(t => t.IsSubclassOf(typeof(UseCase)));

            foreach (var useCase in useCases)
            {
                services.AddTransient(useCase);
            }

            services.AddTransient<IUserResolver, UserResolver>();
        }
    }
}