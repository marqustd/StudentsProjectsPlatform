using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Infrastructure.ViewModels.User;
using Platform.Utilities;
using Platform.Utilities.Utilities;

namespace Platform.Domain.Logic
{
    internal class AdminsLogic : IAdminsLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly IUsersCommonLogic _usersCommonLogic;

        public AdminsLogic(IPlatformRepository platformRepository, IUsersCommonLogic usersCommonLogic)
        {
            _platformRepository = platformRepository;
            _usersCommonLogic = usersCommonLogic;
        }


        public async Task<Admin> AddAdminAsync(AddUserViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var admin = await _platformRepository.GetForEmailAsync<Admin>(model.Email);

            if (admin != null)
            {
                throw new NotFoundException($"Admin with email {model.Email} already exists");
            }

            if (!EmailVerifier.IsFormatCorrect(model.Email))
            {
                throw new ArgumentException("Wrong email format", nameof(model.Email));
            }

            var newAdmin = new Admin
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Obsolete = false
            };

            await _usersCommonLogic.RegisterAsync(newAdmin);
            await _platformRepository.AddAsync(newAdmin);
            return newAdmin;
        }

        public async Task<Admin> ObsoleteAdminAsync(int id)
        {
            var admin = await _platformRepository.GetForIdAsync<Admin>(id);
            if (admin == null)
            {
                throw new NotFoundException($"No Admin with id {id}");
            }

            if (admin.Obsolete)
            {
                throw new ConflictException($"Admin with id {id} is already obsoleted.");
            }

            admin.Obsolete = true;
            await _platformRepository.UpdateAsync(admin);
            return admin;
        }

        public Task<Admin> GetAdminAsync(int id)
        {
            return _platformRepository.GetForIdAsync<Admin>(id);
        }

        public async Task<Tuple<IEnumerable<Admin>, int>> FetchAdminsAsync(string search, int index, int count,
            bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var admins = _platformRepository.FindUserForFullName<Admin>(search);
            if (obsolete)
            {
                var amount = await admins.CountAsync();
                var filtered = await admins
                    .OrderBy(a => a.LastName)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Admin>, int>(filtered, amount);
            }
            else
            {
                var amount = await admins.Where(s => !s.Obsolete).CountAsync();
                var filtered = await admins.Where(s => !s.Obsolete)
                    .OrderBy(a => a.LastName)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Admin>, int>(filtered, amount);
            }
        }

        public async Task<Admin> EditAdminAsync(EditUserViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var admin = await _platformRepository.GetForIdAsync<Admin>(editModel.Id);

            if (!string.IsNullOrWhiteSpace(editModel.Email))
            {
                if (!EmailVerifier.IsFormatCorrect(editModel.Email))
                {
                    throw new ArgumentException("Wrong email format", nameof(editModel.Email));
                }

                var model = new SystemIdEmailModel
                {
                    Email = editModel.Email,
                    SystemId = admin.SystemId
                };

                await _usersCommonLogic.ChangeEmailAsync(model);
                admin.Email = editModel.Email;
            }

            admin.FirstName = editModel.FirstName ?? admin.FirstName;
            admin.LastName = editModel.LastName ?? admin.LastName;
            await _platformRepository.UpdateAsync(admin);
            return admin;
        }

        public async Task<Admin> RestoreAdminAsync(int id)
        {
            var admin = await _platformRepository.GetForIdAsync<Admin>(id);
            if (admin == null)
            {
                throw new NotFoundException($"No Admin with id {id}");
            }

            if (!admin.Obsolete)
            {
                throw new ConflictException($"Admin with id {id} is not obsoleted.");
            }

            admin.Obsolete = false;
            await _platformRepository.UpdateAsync(admin);
            return admin;
        }
    }
}