using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using FluentAssertions;
using NUnit.Framework;
using Platform.Domain.Logic;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Major;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class MajorsLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture fixture;

        private IMajorsLogic CreateSut(PlatformDbContext context)
        {
            var repository = new PlatformRepository(context);
            return new MajorsLogic(repository);
        }

        [Test]
        public async Task AddMajorAsync_WhenModelIsProvided_ThenItShouldAddMajor()
        {
            const string name = "name";
            var model = new AddMajorViewModel
            {
                Name = name
            };

            using (var context = TestsUtilities.MakeContext("AddMajorAsync"))
            {
                var sut = CreateSut(context);
                await sut.AddMajorAsync(model);
                var result = context.Majors.FirstOrDefault();
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task EditMajorAsync_WhenModelIsProvided_ThenItShouldEditMajor()
        {
            const string newName = "NewName";
            var major = new Major
            {
                Name = "Name"
            };

            using (var context = TestsUtilities.MakeContext("EditMajorAsync"))
            {
                await context.AddAsync(major);
                await context.SaveChangesAsync();

                var editModel = new MajorViewModel
                {
                    Name = newName,
                    Id = context.Majors.FirstOrDefault().Id
                };
                var sut = CreateSut(context);
                await sut.EditMajorAsync(editModel);

                var result = context.Majors.FirstOrDefault();
                result.Name.Should().Be(newName);
            }
        }

        [Test]
        public async Task FetchMajorAsync_WhenSearchStringIsProvided_ThenItShouldAddMajor()
        {
            var major = new Major
            {
                Name = "Name1"
            };

            using (var context = TestsUtilities.MakeContext("FetchMajorsAsync"))
            {
                await context.AddAsync(major);
                await context.SaveChangesAsync();
                major = new Major
                {
                    Name = "Name2"
                };
                await context.AddAsync(major);
                await context.SaveChangesAsync();
                major = new Major
                {
                    Name = "Name3",
                    Obsolete = true
                };
                await context.AddAsync(major);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.FetchMajorsAsync("Na", 1, 10, true);
                result.Item2.Should().Be(3);
                result = await sut.FetchMajorsAsync("Na", 1, 10, false);
                result.Item2.Should().Be(2);
            }
        }

        [Test]
        public async Task GetMajorAsync_WhenIdIsProvided_ThenItShouldReturnMajor()
        {
            const string name = "Get";
            var major = new Major
            {
                Name = name
            };

            using (var context = TestsUtilities.MakeContext("GetMajorAsync"))
            {
                await context.AddAsync(major);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.GetMajorAsync(context.Majors.FirstOrDefault().Id);
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task ObsoleteMajorAsync_WhenIdIsProvided_ThenItShouldObsoleteMajor()
        {
            var major = new Major();

            using (var context = TestsUtilities.MakeContext("ObsoleteMajorAsync"))
            {
                await context.AddAsync(major);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.ObsoleteMajorAsync(context.Majors.FirstOrDefault().Id);
                var result = context.Majors.FirstOrDefault();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RestoreMajorAsync_WhenIdIsProvided_ThenItShouldRestoreMajor()
        {
            var major = new Major
            {
                Obsolete = true
            };

            using (var context = TestsUtilities.MakeContext("RestoreMajorAsync"))
            {
                await context.AddAsync(major);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                await sut.RestoreMajorAsync(context.Majors.FirstOrDefault().Id);
                var result = context.Majors.FirstOrDefault();
                result.Obsolete.Should().BeFalse();
            }
        }
    }
}