using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.ActivityTemplate;
using Platform.Infrastructure.ViewModels.Topic;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal class TopicsLogic : ITopicsLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly ISubjectsDal _subjectsDal;
        private readonly ITopicsDal _topicsDal;

        public TopicsLogic(IPlatformRepository platformRepository, ISubjectsDal subjectsDal, ITopicsDal topicsDal)
        {
            _platformRepository = platformRepository;
            _subjectsDal = subjectsDal;
            _topicsDal = topicsDal;
        }

        public async Task<Topic> AddTopicToSubjectAsync(AddTopicToSubjectViewModel model)
        {
            Require.NotNull(model, nameof(model));
            Require.NotEmpty(model.Name, nameof(model.Name));

            var subject = await _subjectsDal.GetSubjectWithTopicsAsync(model.SubjectId);
            if (subject == null)
            {
                throw new NotFoundException($"No subject with id {model.SubjectId}");
            }

            if (subject.Topics.FirstOrDefault(t => t.Name == model.Name) != null)
            {
                throw new ConflictException($"Topic named {model.Name} already exists in subject {subject.Name}");
            }

            var topic = new Topic
            {
                Subject = subject,
                Name = model.Name,
                Obsolete = false
            };

            await _platformRepository.AddAsync(topic);

            subject.Topics.ToList().Add(topic);

            await _platformRepository.UpdateAsync(subject);
            return topic;
        }

        public async Task<Topic> EditTopicAsync(EditTopicViewModel model)
        {
            Require.NotNull(model, nameof(model));

            if (!string.IsNullOrWhiteSpace(model.Name))
            {
                var subject = await _subjectsDal.GetSubjectWithTopicsAsync(model.SubjectId);

                var duplicate = subject.Topics.FirstOrDefault(t => t.Name == model.Name);
                if (duplicate != null && duplicate.Id != model.TopicId)
                {
                    throw new ConflictException($"Topic named {model.Name} already exists in subject {subject.Name}");
                }
            }

            var topic = await _platformRepository.GetForIdAsync<Topic>(model.TopicId);
            if (topic == null)
            {
                throw new NotFoundException($"No Topic with id {model.TopicId} found.");
            }

            topic.Name = model.Name ?? topic.Name;
            topic.Description = model.Description ?? topic.Description;
            await _platformRepository.UpdateAsync(topic);
            return topic;
        }

        public async Task<Topic> RestoreTopicAsync(int id)
        {
            var topic = await _platformRepository.GetForIdAsync<Topic>(id);
            if (!topic.Obsolete)
            {
                throw new ConflictException($"Topic with id {id} is not obsoleted");
            }

            topic.Obsolete = false;
            await _platformRepository.UpdateAsync(topic);
            return topic;
        }

        public async Task<Topic> ObsoleteTopicAsync(int id)
        {
            var topic = await _platformRepository.GetForIdAsync<Topic>(id);
            if (topic.Obsolete)
            {
                throw new ConflictException($"Topic with id {id} is already obsoleted");
            }

            topic.Obsolete = true;
            await _platformRepository.UpdateAsync(topic);
            return topic;
        }

        public async Task<(IEnumerable<Topic>, int)> FetchTopics(int subjectId, string search, bool obsolete, int index, int count)
        {
            var topics = await _subjectsDal.FetchTopics(subjectId, search, obsolete, index, count).ToListAsync();
            var totalCount = await _subjectsDal.GetTopicsAmountAsync(subjectId);
            return (topics, totalCount);
        }

        public Task<Topic> GetTopicAsync(GetTopicViewModel model)
        {
            return _platformRepository.GetForIdAsync<Topic>(model.TopicId);
        }

        public async Task<ActivityTemplate> AddActivityTemplateToTopicAsync(AddActivityTemplateViewModel model)
        {
            var topic = await _topicsDal.GetTopicWithActivitiesTemplatesAsync(model.TopicId);
            var activity = new ActivityTemplate
            {
                Description = string.IsNullOrWhiteSpace(model.Description) ? string.Empty : model.Description,
                Name = model.Name,
                IncludeArtifact = model.IncludeArtifact
            };
            await _platformRepository.AddAsync(activity);
            topic.ActivityTemplates.Add(activity);
            await _platformRepository.UpdateAsync(topic);
            return activity;
        }
    }
}