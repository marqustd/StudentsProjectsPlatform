using System.Security.Claims;
using System.Threading.Tasks;

namespace Platform.API.Helpers
{
    internal class DevelopUserAssignedHelper : IUserAssignedHelper
    {
        public Task<bool> CheckIfTeacherAssignedToSubjectAsync(ClaimsPrincipal claimsPrincipal, int subjectId)
        {
            return Task.FromResult(true);
        }

        public Task<bool> CheckIfTeacherAssignedToSemesterAsync(ClaimsPrincipal claimsPrincipal, int semesterId)
        {
            return Task.FromResult(true);
        }

        public Task<bool> CheckIfStudentAssignedToSubjectAsync(ClaimsPrincipal claimsPrincipal, int subjectId)
        {
            return Task.FromResult(true);
        }
    }
}