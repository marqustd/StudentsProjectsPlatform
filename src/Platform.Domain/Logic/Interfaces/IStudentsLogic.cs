using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.Domain.Logic.Interfaces
{
    public interface IStudentsLogic
    {
        Task<int> ImportStudentsAsync(IEnumerable<AddStudentViewModel> studentViewModels);
        Task<Student> AddStudentAsync(AddStudentViewModel model);
        Task<Student> ObsoleteStudentAsync(int id);
        Task<Student> GetStudentAsync(int id);
        Task<Tuple<IEnumerable<Student>, int>> FetchStudentsAsync(string search, int index, int count, bool obsolete);
        Task<Student> EditStudentAsync(EditStudentViewModel editModel);
        Task<Student> RestoreStudentAsync(int id);
        Task<GradeViewModel> GradeStudentAsync(GradeStudentViewModel model);
        Task<bool> CheckIfStudentIsInSection(int studentId, int sectionId);
        Task<int?> GetStudentSignedSectionId(int studentId, int subjectId);
        Task<int?> GetSectionGradeForStudent(int studentId, int sectionId);
    }
}