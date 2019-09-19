using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels.ActivityTemplate;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class ActivityTemplateUseCase : UseCase
    {
        private readonly IActivityTemplatesLogic _activityTemplatesLogic;

        public ActivityTemplateUseCase(IActivityTemplatesLogic activityTemplatesLogic)
        {
            _activityTemplatesLogic = activityTemplatesLogic;
        }

        public async Task<IActionResult> EditActivityTemplateAsync(EditActivityTemplateViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var activityTemplate = await _activityTemplatesLogic.EditActivityTemplateAsync(editModel);
            var model = Mapper.Map<ActivityTemplateViewModel>(activityTemplate);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreActivityTemplateAsync(int id)
        {
            var activityTemplate = await _activityTemplatesLogic.RestoreActivityTemplateAsync(id);
            var model = Mapper.Map<ActivityTemplateViewModel>(activityTemplate);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchActivityTemplatesAsync(int subjectId, int topicId)
        {
            var activityTemplates = await _activityTemplatesLogic.FetchActivityTemplatesAsync(subjectId, topicId);
            var model = Mapper.Map<ActivityTemplateBasicViewModel[]>(activityTemplates);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteActivityTemplateAsync(int id)
        {
            var activityTemplate = await _activityTemplatesLogic.ObsoleteActivityTemplateAsync(id);
            var model = Mapper.Map<ActivityTemplateViewModel>(activityTemplate);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RemoveActivityTemplateAsync(RemoveActivityTemplateViewModel model)
        {
            var activityTemplate = await _activityTemplatesLogic.RemoveActivityTemplateAsync(model);
            var id = activityTemplate.Id;
            return Ok(new ApiJsonResponse(id));
        }

        public async Task<IActionResult> GetActivityTemplateAsync(int activityId)
        {
            var activityTemplate = await _activityTemplatesLogic.GetActivityTemplateAsync(activityId);
            var model = Mapper.Map<ActivityTemplateViewModel>(activityTemplate);
            return Ok(new ApiJsonResponse(model));
        }
    }
}