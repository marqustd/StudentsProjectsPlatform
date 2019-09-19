using System.Linq;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Dal
{
    public interface IStudentsDal
    {
        Task<Student> GetStudentWithSectionsAsync(int id);
        Task<StudentSection> GetStudentSectionAsync(int studentId, int sectionId);
        IQueryable<Subject> GetStudentSubjects(int id);
        IQueryable<Subject> GetStudentSubjectsToSign(int studentId);
        Task<bool> CheckIfStudentIsInSection(int studentId, int subjectId);
        Task<Section> GetSectionForStudentAsync(int subjectId, int sectionId);
        Task<int?> GetStudentSignedSectionId(int studentId, int subjectId);
        Task<int?> GetSectionGradeForStudent(int studentId, int sectionId);
    }
}