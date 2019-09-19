using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.User;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class AdminUseCase : UseCase
    {
        private readonly IAdminsLogic _adminsLogic;

        public AdminUseCase(IAdminsLogic adminsLogic)
        {
            _adminsLogic = adminsLogic;
        }

        public async Task<IActionResult> EditAdminAsync(EditUserViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var admin = await _adminsLogic.EditAdminAsync(editModel);
            var model = Mapper.Map<UserViewModel>(admin);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> CreateAdminAsync(AddUserViewModel adminModel)
        {
            Require.NotNull(adminModel, nameof(adminModel));
            adminModel.Verify();

            var newAdmin = await _adminsLogic.AddAdminAsync(adminModel);
            var model = Mapper.Map<UserViewModel>(newAdmin);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteAdminAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var admin = await _adminsLogic.ObsoleteAdminAsync(id.Id);
            var model = Mapper.Map<UserViewModel>(admin);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> GetAdminAsync(int id)
        {
            var admin = await _adminsLogic.GetAdminAsync(id);
            if (admin == null)
            {
                throw new NotFoundException($"No Admin with id {id} found");
            }

            var model = new UserViewModel
            {
                FirstName = admin.FirstName,
                Id = admin.Id,
                Email = admin.Email,
                LastName = admin.LastName,
                IsObsolete = admin.Obsolete
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchAdminsAsync(string search, int index, int count, bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var (admins, totalCount) = await _adminsLogic.FetchAdminsAsync(search, index, count, obsolete);

            var models = Mapper.Map<UserViewModel[]>(admins);

            var model = new ArrayViewModel<UserViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreAdminAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var admin = await _adminsLogic.RestoreAdminAsync(id.Id);
            var model = Mapper.Map<UserViewModel>(admin);
            return Ok(new ApiJsonResponse(model));
        }
    }
}