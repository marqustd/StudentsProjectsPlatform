using Microsoft.Extensions.DependencyInjection;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.IdentityServer;

namespace Platform.Infrastructure
{
    public static class Services
    {
        public static void RegisterInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<IPlatformRepository, PlatformRepository>();
            services.AddTransient<IIdentityServerProxy, IdentityServerProxy>();
            services.AddTransient<ISubjectsDal, SubjectsDal>();
            services.AddTransient<IActivitiesDal, ActivitiesDal>();
            services.AddTransient<ISectionsDal, SectionsDal>();
            services.AddTransient<ITopicsDal, TopicsDal>();
            services.AddTransient<IStudentsDal, StudentsDal>();
            services.AddTransient<ISemestersDal, SemestersDal>();
        }
    }
}