using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Entities;
using Platform.Utilities;

namespace Platform.API.Helpers
{
    internal class UserAssignedHelper : IUserAssignedHelper
    {
        private readonly ISemestersLogic _semestersLogic;
        private readonly ISubjectsLogic _subjectsLogic;
        private readonly IUserResolver _userResolver;

        public UserAssignedHelper(ISubjectsLogic subjectsLogic,
            ISemestersLogic semestersLogic,
            IUserResolver userResolver)
        {
            _subjectsLogic = subjectsLogic;
            _semestersLogic = semestersLogic;
            _userResolver = userResolver;
        }

        public async Task<bool> CheckIfTeacherAssignedToSubjectAsync(ClaimsPrincipal claimsPrincipal, int subjectId)
        {
            Require.NotNull(claimsPrincipal, nameof(claimsPrincipal));

            var teacher = await _userResolver.GetUserAsync<Teacher>(claimsPrincipal);

            var teachers = await _subjectsLogic.GetSubjectsTeachersAsync(subjectId);

            return teachers.Any(t => t.Id.Equals(teacher.Id));
        }

        public async Task<bool> CheckIfTeacherAssignedToSemesterAsync(ClaimsPrincipal claimsPrincipal, int semesterId)
        {
            Require.NotNull(claimsPrincipal, nameof(claimsPrincipal));

            var semester = await _semestersLogic.GetSemesterAsync(semesterId);

            return await CheckIfTeacherAssignedToSubjectAsync(claimsPrincipal, semester.Id);
        }

        public async Task<bool> CheckIfStudentAssignedToSubjectAsync(ClaimsPrincipal claimsPrincipal, int subjectId)
        {
            Require.NotNull(claimsPrincipal, nameof(claimsPrincipal));

            var student = await _userResolver.GetUserAsync<Student>(claimsPrincipal);

            var students = await _subjectsLogic.GetSubjectsStudentsAsync(subjectId);

            return students.Any(s => s.Id.Equals(student.Id));
        }
    }
}