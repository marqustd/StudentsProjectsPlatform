using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;

namespace Platform.API.Areas.Student.Controllers
{
    [Area("Student")]
    [Authorize(Roles = "Student")]
    public class SemesterController : AreaController
    {
        private readonly SemesterUseCase _semesterUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public SemesterController(SemesterUseCase semesterUseCase, IUserAssignedHelper userAssignedHelper)
        {
            _semesterUseCase = semesterUseCase;
            _userAssignedHelper = userAssignedHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int subjectId, int semesterId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
                {
                    return await _semesterUseCase.GetSemesterAsync(semesterId, semesterId);
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
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
    }
}