using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Comment;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Section;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal sealed class SectionsLogic : ISectionsLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly ISectionsDal _sectionsDal;
        private readonly IStudentsDal _studentsDal;
        private readonly ISubjectsDal _subjectsDal;
        private readonly IDateTimeProvider _timeProvider;
        private readonly ITopicsDal _topicsDal;

        public SectionsLogic(
            ITopicsDal topicsDal,
            IPlatformRepository platformRepository,
            IStudentsDal studentsDal,
            ISectionsDal sectionsDal,
            ISubjectsDal subjectsDal,
            IDateTimeProvider timeProvider)
        {
            _timeProvider = timeProvider;
            _topicsDal = topicsDal;
            _platformRepository = platformRepository;
            _studentsDal = studentsDal;
            _sectionsDal = sectionsDal;
            _subjectsDal = subjectsDal;
        }

        public async Task<Section> AddSectionToTopicAsync(AddSectionViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));

            var topic = await _topicsDal.GetTopicWithActivitiesTemplatesAndSectionsAsync(addModel.TopicId);
            if (topic.Obsolete)
            {
                throw new ArgumentException("Topic is obsoleted");
            }

            var semester = await _platformRepository.GetForIdAsync<Semester>(addModel.SemesterId);
            if (semester.Obsolete)
            {
                throw new ArgumentException("Semester is obsoleted");
            }

            var subject = await _platformRepository.GetForIdAsync<Subject>(addModel.SubjectId);
            if (semester.Obsolete)
            {
                throw new ArgumentException("Subject is obsoleted");
            }

            if (topic.Sections.Any(s => s.Semester == semester && s.Name == addModel.Name))
            {
                throw new ConflictException($"Section with name {addModel.Name} exits for semester {semester.Name}");
            }

            var section = new Section
            {
                Capacity = addModel.Capacity,
                Name = addModel.Name,
                Semester = semester,
                Subject = subject,
                Topic = topic,
                State = State.Open
            };

            semester.Sections.Add(section);

            await _platformRepository.AddAsync(section);
            await AddActivitiesFromTemplates(section, topic, semester);
            topic.Sections.Add(section);
            await _platformRepository.UpdateAsync(topic);
            await _platformRepository.UpdateAsync(section);
            return section;
        }

        public async Task<Section> EditSectionAsync(EditSectionViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var section = await _platformRepository.GetForIdAsync<Section>(editModel.SectionId);
            if (section == null)
            {
                throw new NotFoundException($"No section with id {editModel.SectionId} found");
            }

            section.Capacity = editModel.Capacity;
            section.State = (State) editModel.State;
            section.Name = editModel.Name;

            await _platformRepository.UpdateAsync(section);

            return section;
        }

        public async Task<Student> AddStudentToSectionAsync(int studentId, int subjectId, int sectionId)
        {
            var student = await _studentsDal.GetStudentWithSectionsAsync(studentId);

            var subject = await _platformRepository.GetForIdAsync<Subject>(subjectId);
            var section = await _platformRepository.GetForIdAsync<Section>(sectionId,
                x => x.Include(y => y.StudentsSections)
                    .Include(y => y.Topic)
                    .Include(y => y.Semester)
                    .Include(y => y.Activities).ThenInclude(z => z.ActivityToCheck));

            if(section.State != State.Open)
            {
                throw new ConflictException("Section is not open");
            }

            var current = section.StudentsSections.Count;
            if (current >= section.Capacity)
            {
                throw new ConflictException("Section is full");
            }

            var topic = section.Topic;
            var semester = section.Semester;

            if (section.StudentsSections.Any(ss => ss.StudentId == student.Id && ss.SectionId == section.Id))
            {
                throw new ConflictException(
                    $"Student with id {studentId} is already signed to this section with id {sectionId}");
            }

            if (student.StudentsSections.Any(ss =>
                ss.Subject.Id == subjectId && ss.Topic.Id == topic.Id &&
                ss.Semester.Id == semester.Id))
            {
                throw new ConflictException(
                    $"Student with id {studentId} is already signed to another section with id {sectionId}");
            }

            var connection = new StudentSection(student, section, semester, topic, subject);

            foreach (var activity in section.Activities)
            {
                activity.ActivityToCheck.Add(new ActivityCheck(student, activity));
            }

            student.StudentsSections.Add(connection);
            await _platformRepository.SaveChanges();

            return student;
        }

        public async Task<Student> RemoveStudentFromSectionAsync(int studentId, int sectionId)
        {
            var student = await _studentsDal.GetStudentWithSectionsAsync(studentId);

            var section = await _platformRepository.GetForIdAsync<Section>(sectionId,
                x => x.Include(y => y.Activities).ThenInclude(z => z.ActivityToCheck));

            var connection =
                student.StudentsSections.FirstOrDefault(ss => ss.StudentId == student.Id && ss.SectionId == section.Id);

            foreach (var activity in section.Activities) // TODO: Cascade Delete?
            {
                var toDelete = activity.ActivityToCheck
                    .Where(x => x.StudentId.Equals(studentId))
                    .ToList();
                toDelete.ForEach(x => _platformRepository.GetEntityEntry(x).State = EntityState.Deleted);
            }

            student.StudentsSections.Remove(connection);
            await _platformRepository.SaveChanges();
            return student;
        }

        public async Task<(IEnumerable<Section>, int)> FetchSectionsForStudentAsync(int studentId, int subjectId, int index, int count)
        {
            var sections = _subjectsDal.GetSectionsForStudent(studentId, subjectId);

            var amount = await sections.CountAsync();
            var filtered = await sections
                .OrderBy(a => a.Name)
                .Skip(index)
                .Take(count)
                .ToListAsync();
            return (filtered, amount);
        }
        public async Task<(IEnumerable<Section>, int)> FetchSectionsForTeacherAsync(int subjectId, int semesterId, int index, int count)
        {
            var sections = _subjectsDal.GetSectionsForTeacher(subjectId, semesterId);

            var amount = await sections.CountAsync();
            var filtered = await sections
                .OrderBy(a => a.Name)
                .Skip(index)
                .Take(count)
                .ToListAsync();
            return (filtered, amount);
        }

        public Task<Section> GetSectionAsync(int subjectId, int semesterId, int sectionId)
        {
            return _sectionsDal.GetSectionAsync(subjectId, semesterId, sectionId);
        }

        public async Task<IEnumerable<Activity>> GetSectionsActivitiesAsync(int sectionId)
        {
            var section = await _sectionsDal.GetSectionWithActivitiesAsync(sectionId);
            return section.Activities;
        }

        public async Task GradeSectionAsync(GradeSectionViewModel model)
        {
            var grade = model.Grade;
            if (grade <= 1 || grade >= 6)
            {
                throw new ArgumentException("Grade has to be between 2 and 5");
            }

            await _sectionsDal.GradeSectionAsync(model.SectionId, grade);
        }

        public async Task<IEnumerable<Comment>> GetSectionsCommentsAsync(int sectionId)
        {
            var section = await _platformRepository.GetForIdAsync<Section>(sectionId,
                x => x.Include(y => y.Comments).ThenInclude(z => z.Author));

            return section.Comments.AsEnumerable();
        }

        public async Task<IEnumerable<Comment>> AddCommentAsync(AddCommentViewModel vm, User user)
        {
            var section = await _platformRepository.GetForIdAsync<Section>(vm.SectionId,
                x => x.Include(y => y.Comments).ThenInclude(z => z.Author));
            var comment = new Comment
            {
                Author = user,
                Content = vm.Content,
                DateTime = _timeProvider.Now
            };
            section.Comments.Add(comment);
            await _platformRepository.UpdateAsync(section);

            //Update query
            var query = _platformRepository
                .GetEntityEntry(section)
                .Collection(nameof(Section.Comments))
                .Query();

            return await query.Cast<Comment>().ToListAsync();
        }

        public async Task<(IEnumerable<GradeViewModel>, int)> FetchStudentsFromSectionAsync(int sectionId, int index,
            int count)
        {
            var section = await _platformRepository.GetForIdAsync<Section>(sectionId,
                x => x.Include(y => y.StudentsSections).ThenInclude(z => z.Student));

            var length = section.StudentsSections.Count;
            var vm = section.StudentsSections
                .Skip(index)
                .Take(count)
                .Select(x => new GradeViewModel
                {
                    Grade = x.Grade,
                    Name = x.Student.FullName,
                    StudentId = x.StudentId
                });

            return (vm, length);
        }

        private async Task AddActivitiesFromTemplates(Section section, Topic topic, Semester semester)
        {
            var activities = new List<Activity>();

            foreach (var activityTemplate in topic.ActivityTemplates)
            {
                if (activityTemplate.Obsolete)
                {
                    continue;
                }

                var activity = new Activity
                {
                    Name = activityTemplate.Name,
                    Description = activityTemplate.Description,
                    IncludeArtifact = activityTemplate.IncludeArtifact,
                    Topic = topic,
                    Section = section,
                    Semester = semester,
                    ActivityTemplate = activityTemplate
                };
                await _platformRepository.AddAsync(activity);
                activities.Add(activity);
            }

            section.Activities = activities;
            await _platformRepository.UpdateAsync(section);
        }

        public Task<Section> GetSectionForStudentAsync(int subjectId, int sectionId)
        {
            return _studentsDal.GetSectionForStudentAsync(subjectId, sectionId);
        }

        public async Task<SectionExtendedViewModel> SignInAsync(int studentId, int subjectId, int sectionId)
        {
            var section = await _platformRepository.GetForIdAsync<Section>(sectionId,
                x => x.Include(y => y.Subject)
                .Include(y => y.Topic)
                .Include(y => y.Semester)
                .Include(y => y.StudentsSections));

            if (section.Subject.Id != subjectId)
                throw new Exception();
            if (section.StudentsSections.Any(x => x.StudentId == studentId))
                throw new ArgumentException($"Student is already signed in to section with id {sectionId}");

            var student = await _platformRepository.GetForIdAsync<Student>(studentId);

            section.StudentsSections.Add(
                new StudentSection(
                    student, 
                    section, 
                    section.Semester, 
                    section.Topic, 
                    section.Subject));

            await _platformRepository.SaveChanges();

            var vm = Mapper.Map<SectionExtendedViewModel>(section);
            vm.IsSignedIn = true;

            return vm;
        }

        public async Task<SectionExtendedViewModel> SignOutAsync(int studentId, int subjectId, int sectionId)
        {
            var section = await _platformRepository.GetForIdAsync<Section>(sectionId,
             x => x.Include(y => y.Subject)
             .Include(y => y.Topic)
             .Include(y => y.StudentsSections));

            if (section.Subject.Id != subjectId)
                throw new ArgumentException();

            var student = await _platformRepository.GetForIdAsync<Student>(studentId);

            var sectionToRemove = section.StudentsSections.FirstOrDefault(x => x.StudentId == studentId);

            if (sectionToRemove == null)
                throw new ArgumentException($"Student is not signed in to section with id {sectionId}");

            section.StudentsSections.Remove(sectionToRemove);
            await _platformRepository.SaveChanges();
            var vm = Mapper.Map<SectionExtendedViewModel>(section);
            vm.IsSignedIn = false;

            return vm;
        }

        public Task<IEnumerable<Student>> SearchNewStudents(int semesterId, string search)
        {
            return _sectionsDal.SearchNewStudents(semesterId, search);
        }
    }
}