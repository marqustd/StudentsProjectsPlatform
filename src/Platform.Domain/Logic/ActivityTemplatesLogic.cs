using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.ActivityTemplate;

namespace Platform.Domain.Logic
{
    internal class ActivityTemplatesLogic : IActivityTemplatesLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly ITopicsDal _topicsDal;

        public ActivityTemplatesLogic(IPlatformRepository platformRepository, ITopicsDal topicsDal)
        {
            _platformRepository = platformRepository;
            _topicsDal = topicsDal;
        }

        public async Task<ActivityTemplate> EditActivityTemplateAsync(EditActivityTemplateViewModel editModel)
        {
            var activityTemplate = await _platformRepository.GetForIdAsync<ActivityTemplate>(editModel.ActivityId);
            activityTemplate.Name = editModel.Name ?? activityTemplate.Name;
            activityTemplate.Description = editModel.Description ?? activityTemplate.Description;
            activityTemplate.IncludeArtifact = editModel.IncludeArtifact;
            await _platformRepository.UpdateAsync(activityTemplate);
            return activityTemplate;
        }

        public async Task<ActivityTemplate> RestoreActivityTemplateAsync(int id)
        {
            var activityTemplate = await _platformRepository.GetForIdAsync<ActivityTemplate>(id);
            if (!activityTemplate.Obsolete)
            {
                throw new ConflictException($"Activity with id {id} is not obsoleted");
            }

            activityTemplate.Obsolete = false;
            await _platformRepository.UpdateAsync(activityTemplate);
            return activityTemplate;
        }

        public async Task<ActivityTemplate> ObsoleteActivityTemplateAsync(int id)
        {
            var activityTemplate = await _platformRepository.GetForIdAsync<ActivityTemplate>(id);
            if (activityTemplate.Obsolete)
            {
                throw new ConflictException($"Activity with id {id} is already obsoleted");
            }

            activityTemplate.Obsolete = true;
            await _platformRepository.UpdateAsync(activityTemplate);
            return activityTemplate;
        }

        public async Task<ActivityTemplate> RemoveActivityTemplateAsync(RemoveActivityTemplateViewModel model)
        {
            var activityTemplate = await _platformRepository.GetForIdAsync<ActivityTemplate>(model.ActivityId);
            var topic = await _topicsDal.GetTopicWithActivitiesTemplatesAsync(model.TopicId);
            topic.ActivityTemplates.Remove(activityTemplate);
            await _platformRepository.RemoveAsync(activityTemplate);
            return activityTemplate;
        }

        public Task<ActivityTemplate> GetActivityTemplateAsync(int activityId)
        {
            return _platformRepository.GetForIdAsync<ActivityTemplate>(activityId);
        }

        public Task<IEnumerable<ActivityTemplate>> FetchActivityTemplatesAsync(int subjectId, int topicId)
        {
            return _topicsDal.FetchActivityTemplatesAsync(subjectId, topicId);
        }
    }
}