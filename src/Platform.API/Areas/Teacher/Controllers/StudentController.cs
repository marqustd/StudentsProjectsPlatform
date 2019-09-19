using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels.Grade;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class StudentController : AreaController
    {
        private readonly GradeUseCase _gradeUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public StudentController(IUserAssignedHelper userAssignedHelper, GradeUseCase gradeUseCase)
        {
            _userAssignedHelper = userAssignedHelper;
            _gradeUseCase = gradeUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Grade(GradeStudentViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _gradeUseCase.GradeStudentAsync(model);
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