using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.Activity;
using Platform.Infrastructure.ViewModels.Comment;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class ActivityController : AreaController
    {
        private readonly ActivityUseCase _activityUseCase;
        private readonly ActivityArtifactUseCase _artifactUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;
        private readonly IUserResolver _userResolver;

        public ActivityController(IUserAssignedHelper userAssignedHelper,
            ActivityUseCase activityUseCase,
            ActivityArtifactUseCase artifactUseCase,
            IUserResolver userResolver)
        {
            _userAssignedHelper = userAssignedHelper;
            _activityUseCase = activityUseCase;
            _artifactUseCase = artifactUseCase;
            _userResolver = userResolver;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Artifact(int activityId)
        {
            try
            {
                var dto = await _artifactUseCase.DownloadActivityArtifact(activityId);
                return File(dto.File, dto.ContentType, dto.FileName);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int subjectId, int activityId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _activityUseCase.GetActivity(activityId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Discussion(int activityId, int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _activityUseCase.GetActivitiesCommentsAsync(activityId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Comment(AddCommentViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    var user = await _userResolver.GetUserAsync<Infrastructure.Entities.Teacher>(User);
                    return await _activityUseCase.AddCommentAsync(model, user);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }


        [HttpGet]
        public async Task<IActionResult> Check(int subjectId, int activityId, int index = 0,
            int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _activityUseCase.FetchChecks(activityId, index, count);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Check(CheckViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _activityUseCase.CheckStudentAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CheckAll(CheckAllViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _activityUseCase.CheckAllAsync(model);
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