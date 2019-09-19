using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.ActivityTemplate;

namespace Platform.Domain.Logic.Interfaces
{
    public interface IActivityTemplatesLogic
    {
        Task<ActivityTemplate> EditActivityTemplateAsync(EditActivityTemplateViewModel editModel);
        Task<ActivityTemplate> RestoreActivityTemplateAsync(int id);
        Task<ActivityTemplate> ObsoleteActivityTemplateAsync(int id);
        Task<ActivityTemplate> RemoveActivityTemplateAsync(RemoveActivityTemplateViewModel model);
        Task<ActivityTemplate> GetActivityTemplateAsync(int activityId);
        Task<IEnumerable<ActivityTemplate>> FetchActivityTemplatesAsync(int subjectId, int topicId);
    }
}