using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.Domain.Logic.Interfaces
{
    public interface IAdminsLogic
    {
        Task<Admin> AddAdminAsync(AddUserViewModel model);
        Task<Admin> ObsoleteAdminAsync(int id);
        Task<Admin> GetAdminAsync(int id);
        Task<Tuple<IEnumerable<Admin>, int>> FetchAdminsAsync(string search, int index, int count, bool obsolete);
        Task<Admin> EditAdminAsync(EditUserViewModel editModel);
        Task<Admin> RestoreAdminAsync(int id);
    }
}