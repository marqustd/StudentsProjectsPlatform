using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels.Comment;

namespace Platform.API.Areas.Student.Controllers
{
    [Area("Student")]
    [Authorize(Roles = "Student")]
    public class ActivityController : AreaController
    {
        private readonly ActivityUseCase _activityUseCase;
        private readonly ActivityArtifactUseCase _artifactUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public ActivityController(
            IUserAssignedHelper userAssignedHelper,
            ActivityUseCase activityUseCase,
            ActivityArtifactUseCase artifactUseCase,
            IUserResolver userResolver)
            : base(userResolver)
        {
            _userAssignedHelper = userAssignedHelper;
            _activityUseCase = activityUseCase;
            _artifactUseCase = artifactUseCase;
        }

        [HttpPost("/api/[area]/[controller]/{activityId}/artifact")]
        public async Task<IActionResult> AddArtifact(IFormFile file, [FromRoute] int activityId)
        {
            try
            {
                var author = await GetUser<Infrastructure.Entities.Student>();
                return await _artifactUseCase.AddArtifact(file, author, activityId);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
                {
                    var user = await GetUser<Infrastructure.Entities.Student>();

                    return await _activityUseCase.GetActivityForStudent(user.Id, activityId);
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, model.SubjectId))
                {
                    var user = await GetUser<Infrastructure.Entities.Student>();
                    return await _activityUseCase.AddCommentAsync(model, user);
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