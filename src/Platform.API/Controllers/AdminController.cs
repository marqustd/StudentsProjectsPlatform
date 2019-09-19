using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Controllers.Abstracts;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.API.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : ApiController
    {
        private readonly AdminUseCase _adminUseCase;

        public AdminController(AdminUseCase adminUseCase)
        {
            _adminUseCase = adminUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddUserViewModel teacher)
        {
            try
            {
                return await _adminUseCase.CreateAdminAsync(teacher);
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
                return await _adminUseCase.ObsoleteAdminAsync(id);
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
                return await _adminUseCase.RestoreAdminAsync(id);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return await _adminUseCase.GetAdminAsync(id);
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
                return await _adminUseCase.FetchAdminsAsync(search, index, count, obsolete);
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
                return await _adminUseCase.EditAdminAsync(editModel);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}