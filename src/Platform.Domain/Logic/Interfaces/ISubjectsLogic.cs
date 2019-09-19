using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Subject;

namespace Platform.Domain.Logic.Interfaces
{
    public interface ISubjectsLogic
    {
        Task<Subject> AddSubjectAsync(AddSubjectViewModel model);
        Task<(IEnumerable<Subject>, int)> FetchSubjectsAsync(string search, int index, int count, bool obsolete);
        Task<Subject> ObsoleteSubjectAsync(int id);

        /// <param name="expression">Extender for query, could be used to pass Include()</param>
        Task<Subject> GetSubjectAsync(int id, Func<IQueryable<Subject>, IQueryable<Subject>> expression = null);

        Task<Subject> EditSubjectAsync(EditSubjectViewModel editModel);
        Task<Subject> RestoreSubjectAsync(int id);
        Task<IEnumerable<Teacher>> GetSubjectsTeachersAsync(int subjectId);
        Task<Teacher> AddTeacherToSubjectAsync(AddTeacherToSubjectViewModel model);
        Task<Teacher> RemoveTeacherFromSubjectAsync(AddTeacherToSubjectViewModel model);

        Task<(IEnumerable<Teacher>, int)> FetchSubjectTeachersAsync(int subjectId, int index, int count,
            bool obsolete);

        Task<(IEnumerable<Subject>, int)> FetchTeacherSubjectsAsync(int teacherId, string search, int index, int count);
        Task<Subject> SignStudentToSubjectAsync(Student student, SubjectSignInModel signModel);
        Task<IEnumerable<Student>> GetSubjectsStudentsAsync(int subjectId);

        Task<(IEnumerable<Subject>, int)>
            FetchStudentsSubjectsAsync(int studentId, string search, int index, int count);

        Task<(IEnumerable<Subject>, int)>
            FindSubjectsForStudentAsync(int studentId, string search, int index, int count);

    }
}