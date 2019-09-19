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
using Platform.Domain.Utilities;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Semester;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class SemestersLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private DbContextOptions BuildOptions(string name)
        {
            return new DbContextOptionsBuilder<PlatformDbContext>()
                .UseInMemoryDatabase(name)
                .Options;
        }

        private static ISemestersLogic CreateSut(PlatformDbContext context)
        {
            var platformRepository = new PlatformRepository(context);
            var dal = new SubjectsDal(context);
            return new SemestersLogic(platformRepository, dal, new Mock<IDateTimeProvider>().Object);
        }

        [Test]
        public async Task AddSemesterToSubjectAsync_WhenModelIsProvided_ThenItShouldReturnSemester()
        {
            const string password = "test";
            using (var context = TestsUtilities.MakeContext("AddSemesterToSubjectAsync"))
            {
                await context.AddAsync(new Subject());
                await context.AddAsync(new Major());
                await context.SaveChangesAsync();

                var model = new AddSemesterToSubjectViewModel
                {
                    Password = password,
                    MajorId = context.Majors.FirstOrDefault().Id,
                    SubjectId = context.Subjects.FirstOrDefault().Id
                };

                var sut = CreateSut(context);
                await sut.AddSemesterToSubjectAsync(model);
                var result = await context.Semesters.FirstOrDefaultAsync();
                result.Password.Should().Be(password);
            }
        }

        [Test]
        public async Task ChangeSemesterStateAsync_WhenIdModelProvided_ThenItShouldChangeSemestersState()
        {
            using (var context = new PlatformDbContext(BuildOptions("StateSemester")))
            {
                var semester = new Semester
                {
                    State = State.Open
                };

                await context.AddAsync(semester);
                await context.SaveChangesAsync();

                var model = new ChangeStateViewModel
                {
                    SemesterId = context.Semesters.FirstOrDefault().Id,
                    State = (int)State.Canceled
                };

                var sut = CreateSut(context);
                await sut.ChangeSemesterStateAsync(model);
                var result = await context.Semesters.FirstOrDefaultAsync();
                result.State.Should().Be(State.Canceled);
            }
        }

        [Test]
        public async Task EditSemesterStateAsync_WhenIdModelProvided_ThenItShouldChangeSemestersState()
        {
            const string password = "test";
            using (var context = new PlatformDbContext(BuildOptions("EditSemester")))
            {
                var semester = new Semester
                {
                    State = State.Open
                };

                await context.AddAsync(semester);
                await context.SaveChangesAsync();

                var model = new EditSemesterViewModel
                {
                    Id = context.Semesters.FirstOrDefault().Id,
                    State = State.Canceled,
                    Password = password
                };

                var sut = CreateSut(context);
                await sut.EditSemesterAsync(model);
                var result = await context.Semesters.FirstOrDefaultAsync();
                result.State.Should().Be(State.Canceled);
                result.Password.Should().Be(password);
            }
        }

        [Test]
        public async Task FetAchSemestersAsync_WhenIdIsProvided_ThenItShouldReturnSemesters()
        {
            const int years = 3;
            using (var context = new PlatformDbContext(BuildOptions("FetchSemestersAsync")))
            {
                await context.AddAsync(new Subject());
                await context.SaveChangesAsync();
                var subject = await context.Subjects.FirstOrDefaultAsync();

                for (var year = 0; year < years; year++)
                {
                    var semester = new Semester
                    {
                        Year = year,
                        Subject = subject,
                        Major = _fixture.Create<Major>(),
                        Season = Season.Summer,
                        State = State.Open
                    };
                    await context.AddAsync(semester);
                    await context.SaveChangesAsync();
                    semester = await context.Semesters.FirstOrDefaultAsync(s => s.Year == year);
                    subject.Semesters.Add(semester);
                    await context.SaveChangesAsync();
                }


                var sut = CreateSut(context);
                var (semesters, totalCount) = await sut.FetchSemestersAsync(subject.Id, 0, years - 1);
                semesters.Count().Should().Be(years - 1);
                totalCount.Should().Be(years);
            }
        }

        [Test]
        public async Task GetSemesterAsync_WhenIdIsProvided_ThenItShouldReturnSemester()
        {
            const string password = "test";
            using (var context = new PlatformDbContext(BuildOptions("GetSemester")))
            {
                var semester = new Semester
                {
                    Password = password
                };

                await context.AddAsync(semester);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                var result = await sut.GetSemesterAsync((await context.Semesters.FirstOrDefaultAsync()).Id);
                result.Password.Should().Be(password);
            }
        }

        [Test]
        public async Task ObsoleteSemesterAsync_WhenIdIsProvided_ThenItShouldObsoleteSemester()
        {
            using (var context = new PlatformDbContext(BuildOptions("ObsoleteSemester")))
            {
                var semester = new Semester();

                await context.AddAsync(semester);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                await sut.ObsoleteSemesterAsync((await context.Semesters.FirstOrDefaultAsync()).Id);
                var result = await context.Semesters.FirstOrDefaultAsync();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RestoreSemesterAsync_WhenIdIsProvided_ThenItShouldRestoreSemester()
        {
            using (var context = new PlatformDbContext(BuildOptions("RestoreSemester")))
            {
                var semester = new Semester
                {
                    Obsolete = true
                };

                await context.AddAsync(semester);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                await sut.RestoreSemesterAsync((await context.Semesters.FirstOrDefaultAsync()).Id);
                var result = await context.Semesters.FirstOrDefaultAsync();
                result.Obsolete.Should().BeFalse();
            }
        }
    }
}