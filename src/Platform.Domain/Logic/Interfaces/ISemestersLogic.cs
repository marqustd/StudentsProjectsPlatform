using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Semester;

namespace Platform.Domain.Logic.Interfaces
{
    public interface ISemestersLogic
    {
        Task<Semester> AddSemesterToSubjectAsync(AddSemesterToSubjectViewModel model);
        Task<Semester> GetSemesterAsync(int semesterId);
        Task<Semester> ObsoleteSemesterAsync(int id);
        Task<Semester> RestoreSemesterAsync(int id);
        Task<Semester> ChangeSemesterStateAsync(ChangeStateViewModel model);
        Task<Semester> EditSemesterAsync(EditSemesterViewModel model);
        Task<(IEnumerable<Semester>, int)> FetchSemestersAsync(int subjectId, int index, int count);
    }
}