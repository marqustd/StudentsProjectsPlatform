using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Controllers.Abstracts;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;

namespace Platform.API.Controllers
{
    [Authorize]
    public class StudentController : ApiController
    {
        private readonly StudentUseCase _studentUseCase;

        public StudentController(StudentUseCase studentUseCase)
        {
            _studentUseCase = studentUseCase;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return await _studentUseCase.GetStudentAsync(id);
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
                return await _studentUseCase.FetchStudentsAsync(search, index, count, obsolete);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}