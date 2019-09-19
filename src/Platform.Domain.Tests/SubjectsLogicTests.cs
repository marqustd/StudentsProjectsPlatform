using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Platform.Domain.Logic;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Subject;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class SubjectsLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private ISubjectsLogic CreateSut(PlatformDbContext context)
        {
            return new SubjectsLogic(new PlatformRepository(context), new SubjectsDal(context),
                new StudentsDal(context));
        }

        [Test]
        public async Task AddSubjectAsync_WhenModelIsProvided_ThenItShouldAddSubject()
        {
            const string name = "name";
            var model = new AddSubjectViewModel
            {
                Name = name
            };

            using (var context = TestsUtilities.MakeContext("AddSubjectAsync"))
            {
                await context.Teachers.AddAsync(new Teacher());
                await context.SaveChangesAsync();
                model.TeacherId = context.Teachers.FirstOrDefault().Id;
                var sut = CreateSut(context);
                await sut.AddSubjectAsync(model);
                var result = context.Subjects.FirstOrDefault();
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task AddTeacherToSubjectAsync_WhenModelIsProvided_ThenItShouldAddTeacherToSubject()
        {
            var subject = new Subject();
            var teacher = new Teacher();

            using (var context = TestsUtilities.MakeContext("AddTeacherToSubjectAsync"))
            {
                await context.AddAsync(subject);
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();

                var model = new AddTeacherToSubjectViewModel
                {
                    TeacherId = context.Teachers.FirstOrDefault().Id,
                    SubjectId = context.Subjects.FirstOrDefault().Id
                };

                var sut = CreateSut(context);
                await sut.AddTeacherToSubjectAsync(model);
                var result = context.Subjects.Include(s => s.TeachersSubjects).FirstOrDefault();
                result.TeachersSubjects.FirstOrDefault().Teacher.Should().Be(teacher);
            }
        }

        [Test]
        public async Task EditSubjectAsync_WhenModelIsProvided_ThenItShouldEditSubject()
        {
            const string newName = "NewName";
            var subject = new Subject
            {
                Name = "Name"
            };

            using (var context = TestsUtilities.MakeContext("EditSubjectAsync"))
            {
                await context.AddAsync(subject);
                await context.SaveChangesAsync();

                var editModel = new EditSubjectViewModel
                {
                    Name = newName,
                    SubjectId = subject.Id
                };
                var sut = CreateSut(context);
                await sut.EditSubjectAsync(editModel);

                var result = context.Subjects.FirstOrDefault();
                result.Name.Should().Be(newName);
            }
        }

        [Test]
        public async Task FetchSubjectAsync_WhenSearchStringIsProvided_ThenItShouldAddSubject()
        {
            const string name = "Name";
            var subject = new Subject
            {
                Name = name
            };

            using (var context = TestsUtilities.MakeContext("FetchSubjectAsync"))
            {
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                subject = new Subject
                {
                    Name = name
                };
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                subject = new Subject
                {
                    Name = name,
                    Obsolete = true
                };
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.FetchSubjectsAsync("Na", 1, 10, true);
                result.Item2.Should().Be(3);
                result = await sut.FetchSubjectsAsync("Na", 1, 10, false);
                result.Item2.Should().Be(2);
            }
        }

        [Test]
        public async Task FetchSubjectTeachersAsync_WhenIdIsProvided_ThenItShouldReturnTeachers()
        {
            const int teachersNumber = 3;
            using (var context = TestsUtilities.MakeContext("RestoreSubjectAsync"))
            {
                var subject = new Subject();
                await context.AddAsync(subject);
                await context.SaveChangesAsync();

                for (var i = 0; i < teachersNumber - 1; i++)
                {
                    var teacher = new Teacher();
                    subject.TeachersSubjects.Add(new TeacherSubject(teacher, subject));
                }

                var obsoleteTeacher = new Teacher
                {
                    Obsolete = true
                };
                subject.TeachersSubjects.Add(new TeacherSubject(obsoleteTeacher, subject));
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                var (teachers, totalCount) = await sut.FetchSubjectTeachersAsync(subject.Id, 0, 1, true);
                teachers.Count().Should().Be(1);
                totalCount.Should().Be(teachersNumber);
                var (teachers2, totalCount2) = await sut.FetchSubjectTeachersAsync(subject.Id, 0, 1, false);
                teachers2.Count().Should().Be(1);
                totalCount2.Should().Be(teachersNumber - 1);
            }
        }

        [Test]
        public async Task GetSubjectAsync_WhenIdIsProvided_ThenItShouldReturnSubject()
        {
            const string name = "Name";
            var subject = new Subject
            {
                Name = name
            };
            using (var context = TestsUtilities.MakeContext("GetSubjectAsync"))
            {
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.GetSubjectAsync(context.Subjects.FirstOrDefault().Id);
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task ObsoleteSubjectAsync_WhenIdIsProvided_ThenItShouldObsoleteSubject()
        {
            var subject = new Subject();

            using (var context = TestsUtilities.MakeContext("ObsoleteSubjectAsync"))
            {
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.ObsoleteSubjectAsync(context.Subjects.FirstOrDefault().Id);
                var result = context.Subjects.FirstOrDefault();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RemoveTeacherFromSubjectAsync_WhenIdIsProvided_ThenItShouldRemoveTeacherFromSubject()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("RemoveTeacherFromSubjectAsync"))
            {
                var teacher = new Teacher();
                var subject = new Subject
                {
                    Name = test
                };
                await context.AddAsync(teacher);
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                subject = await context.Subjects.Include(s => s.TeachersSubjects)
                    .FirstOrDefaultAsync(s => s.Name == test);

                subject.TeachersSubjects.Add(new TeacherSubject(teacher, subject));

                var model = new AddTeacherToSubjectViewModel
                {
                    SubjectId = context.Subjects.FirstOrDefault().Id,
                    TeacherId = context.Teachers.FirstOrDefault().Id
                };
                var sut = CreateSut(context);
                await sut.RemoveTeacherFromSubjectAsync(model);
                var result = await context.Subjects.Include(s => s.TeachersSubjects)
                    .FirstOrDefaultAsync(s => s.Name == test);
                result.TeachersSubjects.Should().BeEmpty();
            }
        }

        [Test]
        public async Task RestoreSubjectAsync_WhenIdIsProvided_ThenItShouldRestoreSubject()
        {
            var subject = new Subject
            {
                Obsolete = true
            };

            using (var context = TestsUtilities.MakeContext("RestoreSubjectAsync"))

            {
                await context.AddAsync(subject);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.RestoreSubjectAsync(subject.Id);
                var result = context.Subjects.FirstOrDefault();
                result.Obsolete.Should().BeFalse();
            }
        }

        [Test]
        public async Task SignStudentToSubjectAsync_WhenModelIsProvided_ThenItShouldAssignStudent()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("SignStudentToSubjectAsync"))
            {
                var student = new Student();
                var subject = new Subject
                {
                    Name = test
                };

                await context.AddAsync(subject);
                await context.AddAsync(student);
                var semester = new Semester
                {
                    Subject = subject,
                    Password = test
                };
                await context.AddAsync(semester);
                await context.SaveChangesAsync();
                var model = new SubjectSignInModel
                {
                    Password = test,
                    SubjectId = subject.Id
                };

                var sut = CreateSut(context);
                var result = await sut.SignStudentToSubjectAsync(student, model);
                result.Name.Should().Be(test);
            }
        }
    }
}