using Microsoft.Extensions.DependencyInjection;
using Platform.Artifacts.Logic;
using Platform.Utilities.Helpers;

namespace Platform.Artifacts
{
    public static class Services
    {
        public static void RegisterArtifacts(this IServiceCollection services)
        {
            services.AddTransient<IGuidFactory, GuidFactory>();
            services.AddTransient<IFileRepository, LocalFileRepository>();

            //Singletons
            services.AddSingleton(p => new ArtifactsService(
                p.GetRequiredService<IFileRepository>(),
                AppSettingsHelper.ArtifactSettings.MaximumFileSize));
        }
    }
}