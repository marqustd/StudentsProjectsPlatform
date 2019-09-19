using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure.Dal
{
    public interface ISectionsDal
    {
        Task<Section> GetSectionWithStudentsAsync(int sectionId);
        Task<Section> GetSectionWithActivitiesAsync(int sectionId);
        Task<IEnumerable<StudentSection>> GetStudentSectionsAsync(int sectionId);
        Task GradeSectionAsync(int sectionId, int grade);
        Task<Section> GetSectionAsync(int subjectId, int semesterId, int sectionId);
        Task<IEnumerable<Student>> SearchNewStudents(int semesterId, string search);
    }
}