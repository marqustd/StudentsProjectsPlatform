using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Dal
{
    public interface ITopicsDal
    {
        Task<Topic> GetTopicWithActivitiesTemplatesAsync(int id);
        Task<Topic> GetTopicWithActivitiesTemplatesAndSectionsAsync(int id);
        Task<IEnumerable<ActivityTemplate>> FetchActivityTemplatesAsync(int subjectId, int topicId);
    }
}