using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.Subject;
using Platform.Utilities;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class SubjectController : AreaController
    {
        private readonly SubjectArtifactUseCase _artifactUseCase;
        private readonly SubjectUseCase _subjectUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;
        private readonly IUserResolver _userResolver;

        public SubjectController(SubjectUseCase subjectUseCase,
            SubjectArtifactUseCase artifactUseCase,
            IUserAssignedHelper userAssignedHelper,
            IUserResolver userResolve)
        {
            _subjectUseCase = subjectUseCase;
            _artifactUseCase = artifactUseCase;
            _userAssignedHelper = userAssignedHelper;
            _userResolver = userResolve;
        }

        [HttpGet]
        public async Task<IActionResult> Fetch(string search = "", int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                var teacher = await _userResolver.GetUserAsync<Infrastructure.Entities.Teacher>(User);
                Require.NotNull(teacher, nameof(teacher));

                return await _subjectUseCase.FetchTeachersSubjectsAsync(teacher.Id, search, index, count);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _subjectUseCase.GetSubjectAsync(subjectId);
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }


        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] EditSubjectViewModel editModel)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, editModel.SubjectId))
                {
                    return await _subjectUseCase.EditSubjectAsync(editModel);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Teacher(AddTeacherToSubjectViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _subjectUseCase.AddTeacherToSubjectAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTeacher(AddTeacherToSubjectViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _subjectUseCase.RemoveTeacherFromSubjectAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Teachers(int subjectId, int index = 0, int count = Settings.PAGE_SIZE,
            bool obsolete = false)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _subjectUseCase.FetchSubjectTeachersAsync(subjectId, index, count, obsolete);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Artifacts(int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _artifactUseCase.FetchArtifacts(subjectId);
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
        public async Task<IActionResult> Artifact(int subjectId, int artifactId)
        {
            try
            {
                var dto = await _artifactUseCase.DownloadArtifact(subjectId, artifactId);
                return File(dto.File, dto.ContentType, dto.FileName);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost("/api/[area]/[controller]/{subjectId}/artifact")]
        public async Task<IActionResult> AddArtifact(IFormFile file, [FromRoute] int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    var author = await _userResolver.GetUserAsync<Infrastructure.Entities.Teacher>(User);
                    return await _artifactUseCase.AddArtifact(file, subjectId, author);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpDelete("/api/[area]/[controller]/{subjectId}/artifact/{artifactId}")]
        public async Task<IActionResult> RemoveArtifact(int subjectId, int artifactId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _artifactUseCase.RemoveArtifact(subjectId, artifactId);
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