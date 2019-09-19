using System;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Platform.Domain.Logic;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Section;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class SectionsLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private static ISectionsLogic CreateSut(PlatformDbContext context)
        {
            return new SectionsLogic(new TopicsDal(context),
                new PlatformRepository(context),
                new StudentsDal(context),
                new SectionsDal(context),
                new SubjectsDal(context),
                new DateTimeProvider());
        }

        [Test]
        public async Task AddSectionToTopicAsync_WhenModelIsProvided_ThenItShouldReturnNewSection()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("AddSectionToTopicAsync"))
            {
                var subject = new Subject();
                var activityTemplate = new ActivityTemplate
                {
                    Name = test
                };
                var topic = new Topic();
                var semester = new Semester();
                await context.AddAsync(subject);
                await context.AddAsync(semester);
                await context.AddAsync(topic);
                await context.AddAsync(activityTemplate);
                await context.SaveChangesAsync();
                topic.ActivityTemplates.Add(activityTemplate);
                await context.SaveChangesAsync();
                var model = new AddSectionViewModel
                {
                    Name = test,
                    SubjectId = subject.Id,
                    TopicId = topic.Id,
                    SemesterId = semester.Id
                };

                var sut = CreateSut(context);
                await sut.AddSectionToTopicAsync(model);
                var result = await context.Topics.FirstOrDefaultAsync();
                result.Sections.FirstOrDefault().Name.Should().Be(test);
                var section = await context.Sections.FirstOrDefaultAsync();
                section.Activities.Should().NotBeEmpty();
            }
        }

        [Test]
        public async Task AddStudentToSectionAsync_WhenIdModelProvided_ThenItShouldAddStudentToSection()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("AddStudentToSectionAsync"))
            {
                var student = new Student
                {
                    FirstName = test
                };
                var subject = new Subject();
                var topic = new Topic();
                var semester = new Semester();
                var section = new Section
                {
                    Capacity = 4
                };
                await context.AddAsync(subject);
                await context.AddAsync(semester);
                await context.AddAsync(topic);
                await context.AddAsync(section);
                await context.AddAsync(student);
                await context.SaveChangesAsync();


                var sut = CreateSut(context);
                var result = await sut.AddStudentToSectionAsync(student.Id, subject.Id, section.Id);
                result.Id.Should().Be(student.Id);

                var actual = context.StudentSections
                    .Where(x => x.SectionId.Equals(section.Id))
                    .FirstOrDefault(x => x.StudentId == student.Id);

                actual.Should().NotBeNull();
                actual.StudentId.Should().Be(student.Id);
            }
        }

        [Test]
        public async Task EditSectionAsync_WhenIdModelProvided_ThenItShouldEditSection()
        {
            const string expectedName = "test";
            const int expectedCapacity = 4;
            const State expectedState = State.Closed;
            using (var context = TestsUtilities.MakeContext("EditSectionAsync"))
            {
                var section = new Section
                {
                    State = State.Open,
                    Name = "",
                    Capacity = 0
                };
                await context.AddAsync(section);
                await context.SaveChangesAsync();
                var model = new EditSectionViewModel
                {
                    SectionId = section.Id,
                    Name = expectedName,
                    State = (int) expectedState,
                    Capacity = expectedCapacity
                };

                var sut = CreateSut(context);
                await sut.EditSectionAsync(model);

                var result = await context.Sections.FirstOrDefaultAsync();
                result.Capacity.Should().Be(expectedCapacity);
                result.Name.Should().Be(expectedName);
                result.State.Should().Be(expectedState);
            }
        }

        [Test]
        public async Task FetchSectionsAsync_WhenIdIsProvided_ThenItShouldReturnSections()
        {
            const int years = 3;
            using (var context = TestsUtilities.MakeContext("FetchSectionsAsync"))
            {
                var semester = new Semester();
                var subject = new Subject();
                var topic = new Topic();
                await context.AddAsync(subject);
                await context.AddAsync(semester);
                await context.AddAsync(topic);
                topic.Subject = subject;
                await context.SaveChangesAsync();

                for (var i = 0; i < years; i++)
                {
                    var section = new Section
                    {
                        Subject = subject,
                        Semester = semester
                    };
                    topic.Sections.Add(section);
                }

                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                var (sections, totalCount) = await sut.FetchSectionsForTeacherAsync(subject.Id, semester.Id, 0, years - 1);
                sections.Count().Should().Be(years - 1);
                totalCount.Should().Be(years);
            }
        }

        [Test]
        public async Task GetSectionAsync_WhenIdIsProvided_ThenItShouldReturnSection()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("AddStudentToSectionAsync"))
            {
                var semester = new Semester();
                var subject = new Subject();
                await context.AddAsync(semester);
                await context.AddAsync(subject);
                await context.SaveChangesAsync();

                var section = new Section
                {
                    Name = test,
                    Subject = subject,
                    Semester = semester,
                };
                await context.AddAsync(section);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                var result = await sut.GetSectionAsync(subject.Id, semester.Id, section.Id);
                result.Name.Should().Be(test);
            }
        }

        [Test]
        public async Task GetSectionsActivitiesAsync_WhenIdIsProvided_ThenItShouldReturnSection()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("GetSectionsActivitiesAsync"))
            {
                var topic = new Topic();
                var subject = new Subject();
                var activityTemplate = new ActivityTemplate
                {
                    Name = test
                };
                var semester = new Semester();
                await context.AddAsync(topic);
                await context.AddAsync(activityTemplate);
                await context.AddAsync(semester);
                await context.AddAsync(subject);
                await context.SaveChangesAsync();

                subject.Topics.Add(topic);
                subject.Semesters.Add(semester);
                topic.ActivityTemplates.Add(activityTemplate);
                await context.SaveChangesAsync();

                var addModel = new AddSectionViewModel
                {
                    TopicId = topic.Id,
                    SemesterId = semester.Id,
                    SubjectId = subject.Id,
                    Name = test
                };

                var sut = CreateSut(context);
                var section = await sut.AddSectionToTopicAsync(addModel);
                var result = await sut.GetSectionsActivitiesAsync(section.Id);
                result.Should().NotBeEmpty();
                result.FirstOrDefault().ActivityTemplate.Name.Should().Be(test);
            }
        }

        [Test]
        public async Task GetSectionsGradesAsync_WhenIdIsProvided_ThenItShouldReturnGradesModels()
        {
            const int grade = 3;
            using (var context = TestsUtilities.MakeContext("GetSectionsGradesAsync"))
            {
                var student = new Student();
                var student1 = new Student();
                var section = new Section();
                var semester = new Semester();
                var subject = new Subject();
                var topic = new Topic();
                await context.AddAsync(semester);
                await context.AddAsync(subject);
                await context.AddAsync(topic);
                await context.AddAsync(student);
                await context.AddAsync(student1);
                await context.AddAsync(section);
                await context.SaveChangesAsync();
                var studentSection = new StudentSection(student, section, semester, topic, subject) {Grade = grade};
                section.StudentsSections.Add(studentSection);
                studentSection = new StudentSection(student1, section, semester, topic, subject) {Grade = grade};
                section.StudentsSections.Add(studentSection);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var (result, _) = await sut.FetchStudentsFromSectionAsync(section.Id, 0, 1);
                result.Should().NotBeEmpty();
                result.FirstOrDefault().Grade.Should().Be(grade);
            }
        }

        [Test]
        public async Task GradeSectionAsync_WhenModelIsProvided_ThenItShouldGradeSection()
        {
            const int grade = 3;
            using (var context = TestsUtilities.MakeContext("GradeSectionAsync"))
            {
                var student = new Student();
                var student1 = new Student();
                var section = new Section();
                var semester = new Semester();
                var subject = new Subject();
                var topic = new Topic();
                await context.AddAsync(semester);
                await context.AddAsync(subject);
                await context.AddAsync(topic);
                await context.AddAsync(student);
                await context.AddAsync(student1);
                await context.AddAsync(section);
                await context.SaveChangesAsync();
                var studentSection = new StudentSection(student, section, semester, topic, subject);
                section.StudentsSections.Add(studentSection);
                studentSection = new StudentSection(student1, section, semester, topic, subject);
                section.StudentsSections.Add(studentSection);
                await context.SaveChangesAsync();
                var model = new GradeSectionViewModel
                {
                    Grade = grade,
                    SectionId = section.Id
                };
                var sut = CreateSut(context);
                await sut.GradeSectionAsync(model);
                var (updated, count) = await sut.FetchStudentsFromSectionAsync(model.SectionId, 0, 1);
                updated.Should().NotBeEmpty();
                updated.FirstOrDefault().Grade.Should().Be(grade);
            }
        }

        [Test]
        public async Task RemoveStudentFromSectionAsync_WhenIdIsProvided_ThenItShouldRemoveStudent()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("RemoveStudentFromSectionAsync"))
            {
                var student = new Student();
                var section = new Section
                {
                    Name = test
                };
                var topic = new Topic();
                var subject = new Subject();
                var semester = new Semester();

                await context.AddAsync(student);
                await context.AddAsync(section);
                await context.AddAsync(semester);
                await context.AddAsync(topic);
                await context.AddAsync(subject);
                await context.SaveChangesAsync();

                section = await context.Sections.Include(s => s.StudentsSections)
                    .FirstOrDefaultAsync(s => s.Name == test);

                section.StudentsSections.Add(new StudentSection(student, section, semester, topic, subject));
                context.Update(section);
                await context.SaveChangesAsync();

                var model = new AddStudentToSectionViewModel
                {
                    StudentId = context.Students.FirstOrDefault().Id,
                    SubjectId = context.Subjects.FirstOrDefault().Id,
                    SectionId = context.Sections.FirstOrDefault().Id
                };

                var sut = CreateSut(context);
                await sut.RemoveStudentFromSectionAsync(model.StudentId, model.SectionId);

                section = await context.Sections.FirstOrDefaultAsync(s => s.Name == test);
                section.StudentsSections.Should().BeEmpty();
            }
        }
    }
}