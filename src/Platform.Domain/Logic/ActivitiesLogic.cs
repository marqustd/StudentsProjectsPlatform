using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Activity;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal class ActivitiesLogic : IActivitiesLogic
    {
        private readonly IActivitiesDal _activitiesDal;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IPlatformRepository _platformRepository;

        public ActivitiesLogic(IActivitiesDal activitiesDal, IDateTimeProvider dateTimeProvider,
            IPlatformRepository platformRepository)
        {
            _activitiesDal = activitiesDal;
            _dateTimeProvider = dateTimeProvider;
            _platformRepository = platformRepository;
        }

        public async Task<IEnumerable<Comment>> GetActivityCommentsAsync(int activityId)
        {
            var activity = await _activitiesDal.GetActivityWithCommentsAsync(activityId);
            return activity.Comments;
        }

        public async Task<IEnumerable<Comment>> AddCommentToActivityAsync(int activityId, string content, User user)
        {
            Require.NotEmpty(content, nameof(content));

            var activity = await _activitiesDal.GetActivityWithCommentsAsync(activityId);
            var comment = new Comment
            {
                Author = user,
                Content = content,
                DateTime = _dateTimeProvider.Now
            };
            await _platformRepository.AddAsync(comment);
            activity.Comments.Add(comment);
            await _platformRepository.UpdateAsync(activity);
            return activity.Comments;
        }

        public Task<Activity> GetActivityAsync(int activityId)
        {
            return _platformRepository.GetForIdAsync<Activity>(activityId,
                a => a.Include(x => x.Artifact));
        }

        public async Task<(IEnumerable<CheckedStudentViewModel>, int)> FetchChecks(int activityId, int index, int count)
        {
            var query = _activitiesDal.ActivityChecksQuery(activityId);
            var totalAmount = await query.CountAsync();
            var vm = query.Skip(index).Take(count).Select(x => new CheckedStudentViewModel
            {
                IsChecked = x.IsChecked,
                Name = x.Student.FullName,
                StudentId = x.Student.Id
            });

            return (vm, totalAmount);
        }

        public async Task<CheckedStudentViewModel> CheckStudent(CheckViewModel model)
        {
            var activity = await _platformRepository.GetForIdAsync<Activity>(model.ActivityId,
                x => x.Include(y => y.ActivityToCheck).ThenInclude(z => z.Student));

            var activityToCheck = activity.ActivityToCheck
                .FirstOrDefault(x => x.StudentId.Equals(model.StudentId));

            activityToCheck.IsChecked = model.Check;
            await _platformRepository.SaveChanges();

            return new CheckedStudentViewModel
            {
                StudentId = activityToCheck.StudentId,
                Name = activityToCheck.Student.FullName,
                IsChecked = model.Check
            };
        }

        public async Task CheckAllStudents(CheckAllViewModel model)
        {
            var activity = await _platformRepository.GetForIdAsync<Activity>(model.ActivityId,
                x => x.Include(y => y.ActivityToCheck));

            foreach (var check in activity.ActivityToCheck)
            {
                check.IsChecked = model.Check;
            }

            await _platformRepository.SaveChanges();
        }

        public async Task<ActivityForStudentVewModel> GetActivityForStudent(int studentId, int activityId)
        {
            return await _activitiesDal.GetActivityForStudent(studentId, activityId);
        }
    }
}