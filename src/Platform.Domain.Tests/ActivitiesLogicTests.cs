using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using Platform.Domain.Logic;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class ActivityTemplatesLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private static IActivitiesLogic CreateSut(PlatformDbContext context)
        {
            return new ActivitiesLogic(new ActivitiesDal(context), new Mock<IDateTimeProvider>().Object,
                new PlatformRepository(context));
        }


        [Test]
        public async Task AddCommentAsync_WhenIdIsProvided_ThenItShouldAddCommentToActivity()
        {
            const string content = "Test";
            using (var context = TestsUtilities.MakeContext("AddCommentAsync"))
            {
                var activity = new Activity();
                await context.AddAsync(activity);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.AddCommentToActivityAsync(activity.Id, content, new Teacher());
                result.FirstOrDefault().Content.Should().Be(content);
            }
        }

        [Test]
        public async Task GetActivityWithCommentsAsync_WhenIdIsProvided_ThenItShouldReturnActivityWithComments()
        {
            const string content = "Test";
            using (var context = TestsUtilities.MakeContext("GetActivityWithCommentsAsync"))
            {
                var activityTemplate = new ActivityTemplate();
                await context.AddAsync(activityTemplate);
                await context.SaveChangesAsync();
                var activity = new Activity
                {
                    ActivityTemplate = activityTemplate
                };
                await context.AddAsync(activity);
                await context.SaveChangesAsync();

                var comment = new Comment
                {
                    Content = content
                };
                await context.AddAsync(comment);
                await context.SaveChangesAsync();
                activity.Comments.Add(comment);
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var result = await sut.GetActivityCommentsAsync(activity.Id);
                result.FirstOrDefault().Content.Should().Be(content);
            }
        }
    }
}