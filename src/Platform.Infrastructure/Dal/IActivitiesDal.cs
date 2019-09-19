using System.Linq;
using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Activity;

namespace Platform.Infrastructure.Dal
{
    public interface IActivitiesDal
    {
        Task<Activity> GetActivityWithCommentsAsync(int activityId);
        IQueryable<ActivityCheck> ActivityChecksQuery(int activityId);
        Task<ActivityForStudentVewModel> GetActivityForStudent(int studentId, int activityId);
    }
}