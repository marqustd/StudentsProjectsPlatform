using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels.ActivityTemplate;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class ActivityTemplateController : AreaController
    {
        private readonly ActivityTemplateUseCase _activityTemplateUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public ActivityTemplateController(ActivityTemplateUseCase activityTemplateUseCase,
            IUserAssignedHelper userAssignedHelper)
        {
            _activityTemplateUseCase = activityTemplateUseCase;
            _userAssignedHelper = userAssignedHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Fetch(int subjectId, int topicId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _activityTemplateUseCase.FetchActivityTemplatesAsync(subjectId, topicId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int activityId, int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _activityTemplateUseCase.GetActivityTemplateAsync(activityId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(EditActivityTemplateViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _activityTemplateUseCase.EditActivityTemplateAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Obsolete(RemoveActivityTemplateViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _activityTemplateUseCase.ObsoleteActivityTemplateAsync(model.ActivityId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Restore(RemoveActivityTemplateViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _activityTemplateUseCase.RestoreActivityTemplateAsync(model.ActivityId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(RemoveActivityTemplateViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _activityTemplateUseCase.RemoveActivityTemplateAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}