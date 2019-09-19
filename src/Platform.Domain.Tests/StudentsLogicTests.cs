using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using Platform.Domain.Logic;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class StudentsLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture fixture;

        private IStudentsLogic CreateSut(PlatformDbContext context)
        {
            return new StudentsLogic(new PlatformRepository(context), new Mock<IUsersCommonLogic>().Object,
                new StudentsDal(context));
        }

        [Test]
        public async Task AddStudentAsync_WhenModelIsProvided_ThenItShouldAddStudent()
        {
            const int albumNumber = 12345;


            using (var context = TestsUtilities.MakeContext("AddStudentAsync"))
            {
                await context.AddAsync(new Major());
                await context.SaveChangesAsync();
                var sut = CreateSut(context);

                var model = new AddStudentViewModel
                {
                    AlbumNumber = albumNumber,
                    FirstName = "Name",
                    LastName = "LastName",
                    MajorId = context.Majors.FirstOrDefault().Id
                };

                await sut.AddStudentAsync(model);
                var result = context.Students.FirstOrDefault();
                result.AlbumNumber.Should().Be(albumNumber);
            }
        }

        [Test]
        public async Task EditStudentAsync_WhenModelIsProvided_ThenItShouldEditStudent()
        {
            const string newEmail = "newmail@newmail.com";
            const string newName = "newName";

            var student = new Student
            {
                AlbumNumber = 1234,
                FirstName = "Name",
                LastName = "LastName",
                Major = new Major(),
                Verified = true
            };
            using (var context = TestsUtilities.MakeContext("EditStudentAsync"))
            {
                await context.AddAsync(student);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var editModel = new EditStudentViewModel
                {
                    FirstName = newName,
                    Id = context.Students.FirstOrDefault().Id,
                    Email = newEmail
                };
                await sut.EditStudentAsync(editModel);
                var result = context.Students.FirstOrDefault();
                result.FirstName.Should().Be(newName);
                result.Email.Should().Be(newEmail);
            }
        }

        [Test]
        public async Task FetchStudentsAsync_WhenSearchStringIsProvided_ThenItReturnStudent()
        {
            var student = new Student
            {
                AlbumNumber = 1,
                FirstName = "Name",
                LastName = "Last",
                Major = new Major()
            };
            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("GetStudent")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(student);
                await context.SaveChangesAsync();
                student = new Student
                {
                    AlbumNumber = 2,
                    FirstName = "Name",
                    LastName = "Last",
                    Major = new Major()
                };
                student.AlbumNumber = 2;
                await context.AddAsync(student);
                await context.SaveChangesAsync();
                student = new Student
                {
                    AlbumNumber = 3,
                    FirstName = "Name",
                    LastName = "Last",
                    Major = new Major()
                };
                student.AlbumNumber = 3;
                student.Obsolete = true;
                await context.AddAsync(student);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                var result = await sut.FetchStudentsAsync("Na", 1, 10, true);
                result.Item2.Should().Be(3);
                result = await sut.FetchStudentsAsync("Na", 1, 10, false);
                result.Item2.Should().Be(2);
            }
        }

        [Test]
        public async Task GetStudentAsync_WhenIdIsProvided_ThenItShouldReturnStudent()
        {
            var student = new Student
            {
                AlbumNumber = 1,
                FirstName = "Name",
                LastName = "LastName",
                Major = new Major()
            };
            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("ObsoleteStudent")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(student);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.GetStudentAsync(context.Students.FirstOrDefault().Id);
                result.FirstName.Should().Be("Name");
            }
        }

        [Test]
        public async Task GradeStudentAsync_WhenModelIsProvided_ThenItShouldGradeStudent()
        {
            const int grade = 3;
            using (var context = TestsUtilities.MakeContext("GradeStudentAsync"))
            {
                var student = new Student();
                var section = new Section();
                var semester = new Semester();
                var subject = new Subject();
                var topic = new Topic();
                await context.AddAsync(semester);
                await context.AddAsync(subject);
                await context.AddAsync(topic);
                await context.AddAsync(student);
                await context.AddAsync(section);
                await context.SaveChangesAsync();
                var studentSection = new StudentSection(student, section, semester, topic, subject);
                section.StudentsSections.Add(studentSection);
                await context.SaveChangesAsync();
                var model = new GradeStudentViewModel
                {
                    Grade = grade,
                    SectionId = section.Id,
                    StudentId = student.Id
                };
                var sut = CreateSut(context);
                var result = await sut.GradeStudentAsync(model);
                result.Grade.Should().Be(grade);
                result.StudentId.Should().Be(student.Id);
            }
        }

        [Test]
        public async Task ImportStudentsAsync_WhenIdIsProvided_ThenItShouldImportStudents()
        {
            using (var context = TestsUtilities.MakeContext("ImportStudentsAsync"))
            {
                await context.AddAsync(new Major());
                await context.SaveChangesAsync();
                var majorId = (await context.Majors.FirstOrDefaultAsync()).Id;
                var students = new[]
                {
                    new AddStudentViewModel
                    {
                        MajorId = majorId
                    },
                    new AddStudentViewModel
                    {
                        MajorId = majorId
                    },
                    new AddStudentViewModel
                    {
                        MajorId = majorId
                    }
                };
                var sut = CreateSut(context);
                await sut.ImportStudentsAsync(students);
                var result = await context.Students.CountAsync();
                result.Should().Be(3);
            }
        }

        [Test]
        public async Task ObsoleteStudentAsync_WhenIdIsProvided_ThenItShouldObsoleteStudent()
        {
            var student = new Student
            {
                AlbumNumber = 1,
                FirstName = "Name",
                LastName = "LastName",
                Major = new Major()
            };
            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("ObsoleteStudent")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(student);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.ObsoleteStudentAsync(context.Students.FirstOrDefault().Id);
                var result = context.Students.FirstOrDefault();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RestoreStudentAsync_WhenIdIsProvided_ThenItShouldRestoreStudent()
        {
            var student = new Student
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "123",
                Obsolete = true
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("RestoreStudent")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(student);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.RestoreStudentAsync(context.Students.FirstOrDefault().Id);
                var result = context.Students.FirstOrDefault();
                result.Obsolete.Should().BeFalse();
            }
        }
    }
}