using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;

namespace Platform.Infrastructure.Dal
{
    internal sealed class TopicsDal : ITopicsDal
    {
        private readonly PlatformDbContext _dbContext;

        public TopicsDal(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ActivityTemplate>> FetchActivityTemplatesAsync(int subjectId, int topicId)
        {
            var topic = await _dbContext.Topics
                .Where(x => x.Subject.Id == subjectId)
                .Include(x => x.ActivityTemplates)
                .SingleOrDefaultAsync(x => x.Id == topicId);

            return topic.ActivityTemplates;
        }

        public async Task<Topic> GetTopicWithActivitiesTemplatesAndSectionsAsync(int id)
        {
            var topic = await _dbContext.Topics
                .Include(t => t.ActivityTemplates)
                .Include(t => t.Sections)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (topic == null)
            {
                throw new NotFoundException($"No Topic with id {id} found");
            }

            return topic;
        }

        public async Task<Topic> GetTopicWithActivitiesTemplatesAsync(int id)
        {
            var topic = await _dbContext.Topics
                .Include(t => t.ActivityTemplates)
                .FirstOrDefaultAsync(s => s.Id == id);
            if (topic == null)
            {
                throw new NotFoundException($"No Topic with id {id} found");
            }

            return topic;
        }
    }
}