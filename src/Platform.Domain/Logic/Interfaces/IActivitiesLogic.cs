using System.Collections.Generic;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Activity;

namespace Platform.Domain.Logic.Interfaces
{
    public interface IActivitiesLogic
    {
        Task<IEnumerable<Comment>> GetActivityCommentsAsync(int activityId);
        Task<IEnumerable<Comment>> AddCommentToActivityAsync(int activityId, string content, User user);
        Task<Activity> GetActivityAsync(int activityId);
        Task<(IEnumerable<CheckedStudentViewModel>, int)> FetchChecks(int activityId, int index, int count);
        Task<CheckedStudentViewModel> CheckStudent(CheckViewModel model);
        Task CheckAllStudents(CheckAllViewModel model);
        Task<ActivityForStudentVewModel> GetActivityForStudent(int studentId, int activityId);
    }
}