using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Semester;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class SemesterController : AreaController
    {
        private readonly SemesterUseCase _semesterUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public SemesterController(SemesterUseCase semesterUseCase, IUserAssignedHelper userAssignedHelper)
        {
            _semesterUseCase = semesterUseCase;
            _userAssignedHelper = userAssignedHelper;
        }

        [HttpPatch("{semesterId}")]
        public async Task<IActionResult> Obsolete([FromRoute] int semesterId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSemesterAsync(User, semesterId))
                {
                    return await _semesterUseCase.ObsoleteSemesterAsync(semesterId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch("{semesterId}")]
        public async Task<IActionResult> Restore([FromRoute] int semesterId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSemesterAsync(User, semesterId))
                {
                    return await _semesterUseCase.RestoreSemesterAsync(semesterId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] EditSemesterViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSemesterAsync(User, model.Id))
                {
                    return await _semesterUseCase.EditSemesterAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> State([FromBody] ChangeStateViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSemesterAsync(User, model.SemesterId))
                {
                    return await _semesterUseCase.ChangeSemesterStateAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddSemesterToSubjectViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _semesterUseCase.AddSemesterToSubjectAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int subjectId, int semesterId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _semesterUseCase.GetSemesterAsync(semesterId, subjectId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Fetch(int subjectId, int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _semesterUseCase.FetchSemestersAsync(subjectId, index, count);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Report(int semesterId, int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    var file = await _semesterUseCase.PrepareEndReportAsync(semesterId);
                    return File(file, "application/pdf", $"SemesterReport_{DateTime.Now.ToString("ddMMyyyy")}.pdf");
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