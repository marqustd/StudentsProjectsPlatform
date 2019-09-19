using System.Security.Claims;
using System.Threading.Tasks;

namespace Platform.API.Helpers
{
    public interface IUserAssignedHelper
    {
        Task<bool> CheckIfTeacherAssignedToSubjectAsync(ClaimsPrincipal claimsPrincipal, int subjectId);
        Task<bool> CheckIfTeacherAssignedToSemesterAsync(ClaimsPrincipal claimsPrincipal, int semesterId);
        Task<bool> CheckIfStudentAssignedToSubjectAsync(ClaimsPrincipal claimsPrincipal, int subjectId);
    }
}