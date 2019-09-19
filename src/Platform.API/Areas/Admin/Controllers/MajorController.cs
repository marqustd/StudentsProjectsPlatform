using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Major;

namespace Platform.API.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class MajorController : AreaController
    {
        private readonly MajorUseCase _majorUseCase;

        public MajorController(MajorUseCase majorUseCase)
        {
            _majorUseCase = majorUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddMajorViewModel addMajor)
        {
            try
            {
                return await _majorUseCase.CreateMajorAsync(addMajor);
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
                return await _majorUseCase.ObsoleteMajorAsync(id.Id);
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
                return await _majorUseCase.RestoreMajorAsync(id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromBody] MajorViewModel editModel)
        {
            try
            {
                return await _majorUseCase.EditMajorAsync(editModel);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}