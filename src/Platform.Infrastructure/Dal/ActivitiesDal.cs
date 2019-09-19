using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Activity;

namespace Platform.Infrastructure.Dal
{
    internal class ActivitiesDal : IActivitiesDal
    {
        private readonly PlatformDbContext _dbContext;

        public ActivitiesDal(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<ActivityCheck> ActivityChecksQuery(int activityId)
        {
            return _dbContext.ActivityChecks
                .Where(x => x.ActivityId.Equals(activityId))
                .Include(x => x.Student)
                .Include(x => x.Activity)
                .OrderBy(x => x.Student.FirstName);
        }

        public async Task<ActivityForStudentVewModel> GetActivityForStudent(int studentId, int activityId)
        {
            var activityCheck = await _dbContext.ActivityChecks
                .Include(x => x.Activity).ThenInclude(x => x.Artifact)
                .Where(x => x.StudentId == studentId)
                .Where(x => x.ActivityId == activityId)
                .FirstOrDefaultAsync();

            return new ActivityForStudentVewModel
            {
                ActivityId = activityCheck.ActivityId,
                IsChecked = activityCheck.IsChecked,
                ArtifactId = activityCheck.Activity.Artifact?.Id ?? 0,
                ArtifactName = activityCheck.Activity.Artifact?.Name,
                IncludeArtifact = activityCheck.Activity.IncludeArtifact,
                Name = activityCheck.Activity.Name,
                Description = activityCheck.Activity.Description,
            };
        }

        public async Task<Activity> GetActivityWithCommentsAsync(int activityId)
        {
            var activity = await _dbContext.Activities
                .Include(a => a.Comments).ThenInclude(c => c.Author)
                .FirstOrDefaultAsync(a => a.Id == activityId);

            if (activity == null)
            {
                throw new NotFoundException($"No Activity with id {activityId} found");
            }

            return activity;
        }
    }
}