using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Controllers.Abstracts;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.API.Controllers
{
    [Authorize]
    public class TeacherController : ApiController
    {
        private readonly TeacherUseCase _teacherUseCase;

        public TeacherController(TeacherUseCase teacherUseCase)
        {
            _teacherUseCase = teacherUseCase;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return await _teacherUseCase.GetTeacherAsync(id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Fetch(string search = "", int index = 0, int count = Settings.PAGE_SIZE,
            bool obsolete = false)
        {
            try
            {
                return await _teacherUseCase.FetchTeachersAsync(search, index, count, obsolete);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [Authorize(Roles = "Teacher")]
        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] EditUserViewModel editModel)
        {
            try
            {
                return await _teacherUseCase.EditTeacherAsync(editModel); //todo teacher can edit only itself
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}