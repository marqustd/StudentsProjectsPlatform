using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.ActivityTemplate;
using Platform.Infrastructure.ViewModels.Topic;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class TopicController : AreaController
    {
        private readonly TopicArtifactUseCase _artifactUseCase;
        private readonly TopicUseCase _topicUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;
        private readonly IUserResolver _userResolver;

        public TopicController(TopicUseCase topicUseCase,
            TopicArtifactUseCase artifactUseCase,
            IUserAssignedHelper userAssignedHelper,
            IUserResolver userResolver)
        {
            _topicUseCase = topicUseCase;
            _artifactUseCase = artifactUseCase;
            _userResolver = userResolver;
            _userAssignedHelper = userAssignedHelper;
        }


        [HttpGet]
        public async Task<IActionResult> Fetch(int subjectId, string search = "", bool obsolete = false, int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _topicUseCase.FetchSubjectTopics(subjectId, search, obsolete, index, count);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetTopicViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _topicUseCase.GetSubjectTopic(model);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddTopicToSubjectViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _topicUseCase.AddTopicToSubjectAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(EditTopicViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _topicUseCase.EditTopicAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Obsolete(ObsoleteTopicViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _topicUseCase.ObsoleteTopicAsync(model.TopicId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Restore(ObsoleteTopicViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _topicUseCase.RestoreTopicAsync(model.TopicId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> ActivityTemplate(AddActivityTemplateViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _topicUseCase.AddActivityTemplateToTopicAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Artifacts(int subjectId, int topicId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _artifactUseCase.FetchArtifacts(subjectId, topicId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Artifact(int subjectId, int topicId, int artifactId)
        {
            try
            {
                var dto = await _artifactUseCase.DownloadArtifact(subjectId, topicId, artifactId);
                return File(dto.File, dto.ContentType, dto.FileName);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost("/api/[area]/subject/{subjectId}/topic/{topicId}/artifact")]
        public async Task<IActionResult> AddArtifact(IFormFile file, [FromRoute] int subjectId, int topicId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    var author = await _userResolver.GetUserAsync<Infrastructure.Entities.Teacher>(User);
                    return await _artifactUseCase.AddArtifact(file, subjectId, topicId, author);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpDelete("/api/[area]/subject/{subjectId}/topic/{topicId}/artifact/{artifactId}")]
        public async Task<IActionResult> RemoveArtifact([FromRoute] int subjectId, int topicId, int artifactId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _artifactUseCase.RemoveArtifact(subjectId, topicId, artifactId);
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