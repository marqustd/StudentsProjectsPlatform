using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Major;

namespace Platform.Domain.Logic.Interfaces
{
    public interface IMajorsLogic
    {
        Task<Major> AddMajorAsync(AddMajorViewModel model);
        Task<Major> ObsoleteMajorAsync(int id);
        Task<Major> GetMajorAsync(int id);
        Task<Major> EditMajorAsync(MajorViewModel editModel);
        Task<Tuple<IEnumerable<Major>, int>> FetchMajorsAsync(string search, int index, int count, bool obsolete);
        Task<Major> RestoreMajorAsync(int id);
    }
}