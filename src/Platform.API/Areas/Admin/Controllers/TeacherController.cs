using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.API.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class TeacherController : AreaController
    {
        private readonly TeacherUseCase _teacherUseCase;

        public TeacherController(TeacherUseCase teacherUseCase)
        {
            _teacherUseCase = teacherUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddUserViewModel teacher)
        {
            try
            {
                return await _teacherUseCase.CreateTeacherAsync(teacher);
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
                return await _teacherUseCase.ObsoleteTeacherAsync(id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }


        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] EditUserViewModel editModel)
        {
            try
            {
                return await _teacherUseCase.EditTeacherAsync(editModel);
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
                return await _teacherUseCase.RestoreTeacherAsync(id);
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
                return await _teacherUseCase.ImportTeachersAsync(file);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}