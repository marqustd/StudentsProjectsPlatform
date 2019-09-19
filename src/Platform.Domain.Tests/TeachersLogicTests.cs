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
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.Domain.Tests
{
    internal class TeachersLogicTests
    {
        private IFixture fixture;

        [SetUp]
        public void SetUp()
        {
            fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private ITeachersLogic CreateSut(PlatformDbContext context)
        {
            var commonLogic = new Mock<IUsersCommonLogic>().Object;
            var repository = new PlatformRepository(context);
            return new TeachersLogic(repository, commonLogic);
        }

        [Test]
        public async Task AddTeacherAsync_WhenModelIsProvided_ThenItShouldAddTeacher()
        {
            const string email = "email@email.com";
            var model = new AddUserViewModel
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = email
            };

            using (var context = TestsUtilities.MakeContext("AddTeacher"))
            {
                var sut = CreateSut(context);
                await sut.AddTeacherAsync(model);
                var result = context.Teachers.FirstOrDefault();
                result.Email.Should().Be(email);
            }
        }

        [Test]
        public async Task ObsoleteTeacherAsync_WhenIdIsProvided_ThenItShouldObsoleteTeacher()
        {
            var teacher = new Teacher
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "123"
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("ObsoleteTeacher")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.ObsoleteTeacherAsync(context.Teachers.FirstOrDefault().Id);
                var result = context.Teachers.FirstOrDefault();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task EditTeacherAsync_WhenModelIsProvided_ThenItShouldEditTeacher()
        {
            const string newName = "NewFirstName";
            const string newEmail = "newmail@newmail.com";
            var teacher = new Teacher
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "12345"
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("ObsoleteTeacher")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();

                var editModel = new EditUserViewModel
                {
                    FirstName = newName,
                    Id = context.Teachers.FirstOrDefault().Id,
                    Email = newEmail
                };
                var sut = CreateSut(context);
                await sut.EditTeacherAsync(editModel);

                var result = context.Teachers.FirstOrDefault();
                result.FirstName.Should().Be(newName);
                result.Email.Should().Be(newEmail);
            }
        }

        [Test]
        public async Task FetchTeachersAsync_WhenModelIsProvided_ThenItShouldAddTeacher()
        {
            var teacher = new Teacher
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "12345"
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("GetTeachers")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();
                teacher = new Teacher
                {
                    FirstName = "Name",
                    LastName = "LastName",
                    Email = "12345"
                };
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();
                teacher = new Teacher
                {
                    FirstName = "Name",
                    LastName = "LastName",
                    Email = "12345"
                };
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.ObsoleteTeacherAsync(context.Teachers.FirstOrDefault().Id);
                var result = await sut.FetchTeachersAsync("Na", 1, 10, true);
                result.Item2.Should().Be(3);
                result = await sut.FetchTeachersAsync("Na", 1, 10, false);
                result.Item2.Should().Be(2);
            }
        }

        [Test]
        public async Task GetTeacherAsync_WhenIdIsProvided_ThenItShouldReturnTeacher()
        {
            var teacher = new Teacher
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "12345"
            };
            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("GetTeacher")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.GetTeacherAsync(context.Teachers.FirstOrDefault().Id);
                result.FirstName.Should().Be("Name");
            }
        }

        [Test]
        public async Task GetTeacherForSystemIdAsync_WhenIdIsProvided_ThenItShouldReturnTeacher()
        {
            const string systemId = "systemId";
            using (var context = TestsUtilities.MakeContext("GetTeacherForSystemIdAsync"))
            {
                await context.AddAsync(new Teacher
                {
                    SystemId = systemId
                });
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                var result = await sut.GetTeacherForSystemIdAsync(systemId);
                result.SystemId.Should().Be(systemId);
            }
        }

        [Test]
        public async Task RestoreTeacherAsync_WhenIdIsProvided_ThenItShouldRestoreTeacher()
        {
            var teacher = new Teacher
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "123",
                Obsolete = true
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("RestoreTeacher")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(teacher);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.RestoreTeacherAsync(context.Teachers.FirstOrDefault().Id);
                var result = context.Teachers.FirstOrDefault();
                result.Obsolete.Should().BeFalse();
            }
        }

        [Test]
        public async Task ImportTeachersAsync_WhenIdIsProvided_ThenItShouldImportTeachers()
        {
            using (var context = TestsUtilities.MakeContext("ImportTeachersAsync"))
            {
                await context.AddAsync(new Major());
                await context.SaveChangesAsync();
                var majorId = (await context.Majors.FirstOrDefaultAsync()).Id;
                var teachers = new[]
                {
                    new AddUserViewModel(),
                    new AddUserViewModel(),
                    new AddUserViewModel()
                };
                var sut = CreateSut(context);
                await sut.ImportTeachersAsync(teachers);
                var result = await context.Teachers.CountAsync();
                result.Should().Be(3);
            }
        }
    }
}