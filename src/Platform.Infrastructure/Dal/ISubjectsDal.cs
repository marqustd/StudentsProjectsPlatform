using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Dal
{
    public interface ISubjectsDal
    {
        Task<Subject> GetSubjectWithTopicsAsync(int id);
        Task<Subject> GetSubjectWithTeachersAsync(int id);
        Task<Subject> GetSubjectWithSemestersAsync(int id);
        Task<int> GetTopicsAmountAsync(int subjectId, bool obsolete = false);
        IQueryable<Semester> GetSubjectsSemesters(int subjectId);
        IQueryable<Teacher> GetSubjectsTeachers(int subjectId);
        IQueryable<Topic> FetchTopics(int subjectId, string search, bool obsolete, int index, int count);
        Task<IEnumerable<Student>> GetSubjectsStudentsAsync(int subjectId);
        IQueryable<Section> GetSectionsForStudent(int studentId, int subjectId);
        IQueryable<Section> GetSectionsForTeacher(int subjectId, int semesterId);
    }
}