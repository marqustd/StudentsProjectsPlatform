using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.Subject;
using Platform.Utilities;

namespace Platform.API.Areas.Student.Controllers
{
    [Area("Student")]
    [Authorize(Roles = "Student")]
    public class SubjectController : AreaController
    {
        private readonly SubjectArtifactUseCase _artifactUseCase;
        private readonly SubjectUseCase _subjectUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public SubjectController(SubjectUseCase subjectUseCase,
            IUserAssignedHelper userAssignedHelper,
            IUserResolver userResolve, 
            SubjectArtifactUseCase artifactUseCase) 
            : base(userResolve)
        {
            _subjectUseCase = subjectUseCase;
            _userAssignedHelper = userAssignedHelper;
            _artifactUseCase = artifactUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Sign(SubjectSignInModel model)
        {
            try
            {
                var student = await GetUser<Infrastructure.Entities.Student>();

                return await _subjectUseCase.SignStudentToSubjectAsync(student, model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Find(string search = "", int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                var student = await GetUser<Infrastructure.Entities.Student>();

                return await _subjectUseCase.FindSubjectsForStudentAsync(student.Id, search, index, count);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
         
        [HttpGet]
        public async Task<IActionResult> Fetch(string search = "", int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                var student = await GetUser<Infrastructure.Entities.Student>();

                return await _subjectUseCase.FetchStudentsSubjectsAsync(student.Id, search, index, count);
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
                {
                    var student = await GetUser<Infrastructure.Entities.Student>();

                    return await _subjectUseCase.GetSubjectForStudentAsync(student.Id, subjectId);
                }

                return Unauthorized();
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
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
    }
}