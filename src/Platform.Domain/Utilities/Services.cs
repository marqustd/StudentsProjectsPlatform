using Microsoft.Extensions.DependencyInjection;
using Platform.Domain.Logic;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Report;

namespace Platform.Domain.Utilities
{
    public static class Services
    {
        public static void RegisterDomain(this IServiceCollection services)
        {
            services.AddTransient<ISubjectsLogic, SubjectsLogic>();
            services.AddTransient<IStudentsLogic, StudentsLogic>();
            services.AddTransient<ITeachersLogic, TeachersLogic>();
            services.AddTransient<IAdminsLogic, AdminsLogic>();
            services.AddTransient<IMajorsLogic, MajorsLogic>();
            services.AddTransient<IUsersCommonLogic, UsersCommonLogic>();
            services.AddTransient<ISemestersLogic, SemestersLogic>();
            services.AddTransient<ITopicsLogic, TopicsLogic>();
            services.AddTransient<IDateTimeProvider, DateTimeProvider>();
            services.AddTransient<ISectionsLogic, SectionsLogic>();
            services.AddTransient<IActivityTemplatesLogic, ActivityTemplatesLogic>();
            services.AddTransient<IFileHelper, FileHelper>();
            services.AddTransient<IActivitiesLogic, ActivitiesLogic>();
            services.AddTransient<IPdfCreator, PdfCreator>();
        }
    }
}