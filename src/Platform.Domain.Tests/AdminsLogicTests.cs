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
    [TestFixture]
    internal class AdminsLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private IAdminsLogic CreateSut(PlatformDbContext context)
        {
            var commonLogic = new Mock<IUsersCommonLogic>().Object;
            var repository = new PlatformRepository(context);
            return new AdminsLogic(repository, commonLogic);
        }

        [Test]
        public async Task AddAdminAsync_WhenModelIsProvided_ThenItShouldAddAdmin()
        {
            const string email = "email@email.com";
            var model = new AddUserViewModel
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = email
            };

            using (var context = TestsUtilities.MakeContext("AddAdminAsync"))
            {
                var sut = CreateSut(context);
                await sut.AddAdminAsync(model);
                var result = context.Admins.FirstOrDefault();
                result.Email.Should().Be(email);
            }
        }

        [Test]
        public async Task EditAdminAsync_WhenModelIsProvided_ThenItShouldEditAdmin()
        {
            const string newName = "NewFirstName";
            const string newEmail = "newmail@newmail.com";
            var admin = new Admin
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "12345"
            };

            using (var context = TestsUtilities.MakeContext("EditAdminAsync"))
            {
                await context.AddAsync(admin);
                await context.SaveChangesAsync();

                var editModel = new EditUserViewModel
                {
                    FirstName = newName,
                    Id = admin.Id,
                    Email = newEmail
                };
                var sut = CreateSut(context);
                await sut.EditAdminAsync(editModel);

                var result = context.Admins.FirstOrDefault();
                result.FirstName.Should().Be(newName);
                result.Email.Should().Be(newEmail);
            }
        }

        [Test]
        public async Task FetchAdminsAsync_WhenSearchStringIsProvided_ThenItShouldAddAdmin()
        {
            var admin = new Admin
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "12345"
            };

            using (var context = TestsUtilities.MakeContext("FetchAdminsAsync"))
            {
                await context.AddAsync(admin);
                await context.SaveChangesAsync();
                admin = new Admin
                {
                    FirstName = "Name",
                    LastName = "LastName",
                    Email = "12345"
                };
                await context.AddAsync(admin);
                await context.SaveChangesAsync();
                admin = new Admin
                {
                    FirstName = "Name",
                    LastName = "LastName",
                    Email = "12345",
                    Obsolete = true
                };
                await context.AddAsync(admin);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.FetchAdminsAsync("Na", 1, 10, true);
                result.Item2.Should().Be(3);
                result = await sut.FetchAdminsAsync("Na", 1, 10, false);
                result.Item2.Should().Be(2);
            }
        }

        [Test]
        public async Task GetAdminAsync_WhenIdIsProvided_ThenItShouldReturnAdmin()
        {
            var admin = new Admin
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "12345"
            };
            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("GetAdmin")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(admin);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.GetAdminAsync(context.Admins.FirstOrDefault().Id);
                result.FirstName.Should().Be("Name");
            }
        }

        [Test]
        public async Task ObsoleteAdminAsync_WhenIdIsProvided_ThenItShouldObsoleteAdmin()
        {
            var admin = new Admin
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "123",
                Obsolete = false
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("ObsoleteAdmin")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(admin);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.ObsoleteAdminAsync(context.Admins.FirstOrDefault().Id);
                var result = context.Admins.FirstOrDefault();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RestoreAdminAsync_WhenIdIsProvided_ThenItShouldRestoreAdmin()
        {
            var admin = new Admin
            {
                FirstName = "Name",
                LastName = "LastName",
                Email = "123",
                Obsolete = true
            };

            var options = new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase("RestoreAdmin")
                .Options;
            using (var context = new PlatformDbContext(options))
            {
                await context.AddAsync(admin);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.RestoreAdminAsync(context.Admins.FirstOrDefault().Id);
                var result = context.Admins.FirstOrDefault();
                result.Obsolete.Should().BeFalse();
            }
        }
    }
}