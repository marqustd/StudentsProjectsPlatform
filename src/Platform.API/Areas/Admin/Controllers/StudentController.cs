using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.API.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class StudentController : AreaController
    {
        private readonly AdminUseCase _adminUseCase;
        private readonly StudentUseCase _studentUseCase;

        public StudentController(AdminUseCase adminUseCase, StudentUseCase studentUseCase)
        {
            _adminUseCase = adminUseCase;
            _studentUseCase = studentUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddStudentViewModel addStudent)
        {
            try
            {
                return await _studentUseCase.CreateStudentAsync(addStudent);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Obsolete([FromBody] IdViewModel id)
        {
            try
            {
                return await _studentUseCase.ObsoleteStudentAsync(id.Id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] EditStudentViewModel editModel)
        {
            try
            {
                return await _studentUseCase.EditStudentAsync(editModel);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Restore([FromBody] IdViewModel id)
        {
            try
            {
                return await _studentUseCase.RestoreStudentAsync(id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                return await _studentUseCase.ImportStudentsAsync(file);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}