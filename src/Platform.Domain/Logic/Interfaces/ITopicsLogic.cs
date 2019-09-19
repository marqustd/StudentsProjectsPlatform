using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.ActivityTemplate;
using Platform.Infrastructure.ViewModels.Topic;

namespace Platform.Domain.Logic.Interfaces
{
    public interface ITopicsLogic
    {
        Task<Topic> AddTopicToSubjectAsync(AddTopicToSubjectViewModel model);
        Task<Topic> EditTopicAsync(EditTopicViewModel model);
        Task<Topic> RestoreTopicAsync(int id);
        Task<Topic> ObsoleteTopicAsync(int id);
        Task<(IEnumerable<Topic>, int)> FetchTopics(int subjectId, string search, bool obsolete, int index, int count);
        Task<Topic> GetTopicAsync(GetTopicViewModel model);
        Task<ActivityTemplate> AddActivityTemplateToTopicAsync(AddActivityTemplateViewModel model);
    }
}