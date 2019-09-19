using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Comment;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Section;

namespace Platform.Domain.Logic.Interfaces
{
    public interface ISectionsLogic
    {
        Task<Section> AddSectionToTopicAsync(AddSectionViewModel addModel);
        Task<Section> EditSectionAsync(EditSectionViewModel editModel);
        Task<Student> AddStudentToSectionAsync(int studentId, int subjectId, int sectionId);
        Task<Student> RemoveStudentFromSectionAsync(int studentId, int sectionId);
        Task<Section> GetSectionAsync(int subjectId, int semesterId, int sectionId);
        Task<IEnumerable<Activity>> GetSectionsActivitiesAsync(int sectionId);
        Task GradeSectionAsync(GradeSectionViewModel model);
        Task<IEnumerable<Comment>> GetSectionsCommentsAsync(int sectionId);
        Task<IEnumerable<Comment>> AddCommentAsync(AddCommentViewModel vm, User user);
        Task<(IEnumerable<GradeViewModel>, int)> FetchStudentsFromSectionAsync(int sectionId, int index, int count);
        Task<Section> GetSectionForStudentAsync(int subjectId, int sectionId);
        Task<SectionExtendedViewModel> SignInAsync(int studentId, int subjectId, int sectionId);
        Task<SectionExtendedViewModel> SignOutAsync(int studentId, int subjectId, int sectionId);
        Task<(IEnumerable<Section>, int)> FetchSectionsForStudentAsync(int studentId, int subjectId, int index, int count);
        Task<(IEnumerable<Section>, int)> FetchSectionsForTeacherAsync(int subjectId, int semesterId, int index, int count);
        Task<IEnumerable<Student>> SearchNewStudents(int semesterId, string search);
    }
}