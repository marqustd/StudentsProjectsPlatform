using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.Domain.Logic.Interfaces
{
    public interface ITeachersLogic
    {
        Task<int> ImportTeachersAsync(IEnumerable<AddUserViewModel> addTeacherModels);
        Task<Teacher> AddTeacherAsync(AddUserViewModel teacher);
        Task<Teacher> ObsoleteTeacherAsync(int id);
        Task<Teacher> GetTeacherAsync(int id);
        Task<Tuple<IEnumerable<Teacher>, int>> FetchTeachersAsync(string search, int index, int count, bool obsolete);
        Task<Teacher> EditTeacherAsync(EditUserViewModel editModel);
        Task<Teacher> RestoreTeacherAsync(int id);
        Task<Teacher> GetTeacherForSystemIdAsync(string systemId);
    }
}