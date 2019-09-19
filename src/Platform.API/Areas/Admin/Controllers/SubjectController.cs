using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Subject;

namespace Platform.API.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class SubjectController : AreaController
    {
        private readonly SubjectUseCase _subjectUseCase;

        public SubjectController(SubjectUseCase subjectUseCase)
        {
            _subjectUseCase = subjectUseCase;
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] EditSubjectViewModel editModel)
        {
            try
            {
                return await _subjectUseCase.EditSubjectAsync(editModel);
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
                return await _subjectUseCase.RestoreSubjectAsync(id);
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
                return await _subjectUseCase.ObsoleteSubjectAsync(id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddSubjectViewModel addModel)
        {
            try
            {
                return await _subjectUseCase.CreateSubjectAsync(addModel);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}