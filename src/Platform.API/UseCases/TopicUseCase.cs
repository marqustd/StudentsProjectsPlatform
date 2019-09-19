using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.ActivityTemplate;
using Platform.Infrastructure.ViewModels.Topic;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class TopicUseCase : UseCase
    {
        private readonly ITopicsLogic _topicsLogic;

        public TopicUseCase(ITopicsLogic topicsLogic)
        {
            _topicsLogic = topicsLogic;
        }

        public async Task<IActionResult> AddTopicToSubjectAsync(AddTopicToSubjectViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));

            var topic = await _topicsLogic.AddTopicToSubjectAsync(addModel);
            var model = Mapper.Map<TopicViewModel>(topic);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> EditTopicAsync(EditTopicViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var topic = await _topicsLogic.EditTopicAsync(editModel);
            var model = Mapper.Map<TopicViewModel>(topic);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchSubjectTopics(int subjectId, string search, bool obsolete, int index, int count)
        {
            var (topics, totalCount) = await _topicsLogic.FetchTopics(subjectId, search, obsolete, index, count);
            var topicsVm = Mapper.Map<TopicViewModel[]>(topics);
            var model = new ArrayViewModel<TopicViewModel>(topicsVm, totalCount);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreTopicAsync(int id)
        {
            var topic = await _topicsLogic.RestoreTopicAsync(id);
            var model = Mapper.Map<TopicViewModel>(topic);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> GetSubjectTopic(GetTopicViewModel model)
        {
            var topic = await _topicsLogic.GetTopicAsync(model);
            var vm = Mapper.Map<TopicViewModel>(topic);
            return Ok(new ApiJsonResponse(vm));
        }

        public async Task<IActionResult> AddActivityTemplateToTopicAsync(AddActivityTemplateViewModel addModel)
        {
            var activityTemplate = await _topicsLogic.AddActivityTemplateToTopicAsync(addModel);
            var model = Mapper.Map<ActivityTemplateViewModel>(activityTemplate);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteTopicAsync(int id)
        {
            var topic = await _topicsLogic.ObsoleteTopicAsync(id);
            var model = Mapper.Map<TopicViewModel>(topic);
            return Ok(new ApiJsonResponse(model));
        }
    }
}