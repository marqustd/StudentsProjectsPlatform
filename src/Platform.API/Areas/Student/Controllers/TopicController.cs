using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.Topic;

namespace Platform.API.Areas.Student.Controllers
{
    [Area("Student")]
    [Authorize(Roles = "Student")]
    public class TopicController : AreaController
    {
        private readonly TopicArtifactUseCase _artifactUseCase;
        private readonly TopicUseCase _topicUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public TopicController(TopicUseCase topicUseCase,
            TopicArtifactUseCase artifactUseCase,
            IUserAssignedHelper userAssignedHelper)
        {
            _topicUseCase = topicUseCase;
            _artifactUseCase = artifactUseCase;
            _userAssignedHelper = userAssignedHelper;
        }


        [HttpGet]
        public async Task<IActionResult> Fetch(int subjectId, string search = "", bool obsolete = false, int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, model.SubjectId))
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

        [HttpGet]
        public async Task<IActionResult> Artifacts(int subjectId, int sectionId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
                {
                    return await _artifactUseCase.FetchStudentArtifacts(subjectId, sectionId);
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
        public async Task<IActionResult> Artifact(int subjectId, int sectionId, int artifactId)
        {
            try
            {
                var dto = await _artifactUseCase.DownloadArtifact(subjectId, sectionId, artifactId);
                return File(dto.File, dto.ContentType, dto.FileName);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}