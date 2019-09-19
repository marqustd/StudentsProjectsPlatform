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
using Platform.Infrastructure.ViewModels.ActivityTemplate;
using Platform.Infrastructure.ViewModels.Topic;

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class TopicsLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private static ITopicsLogic CreateSut(PlatformDbContext context)
        {
            return new TopicsLogic(new PlatformRepository(context),
                new SubjectsDal(context),
                new TopicsDal(context));
        }

        [Test]
        public async Task AddActivityTemplateToTopicAsync_WhenModelIsProvided_ThenActivityShouldBeAdded()
        {
            const string test = "test";
            using (var context = TestsUtilities.MakeContext("AddActivityTemplateToTopicAsync"))
            {
                var subject = new Subject();
                var topic = new Topic();
                await context.AddAsync(subject);
                await context.AddAsync(topic);
                await context.SaveChangesAsync();
                var model = new AddActivityTemplateViewModel
                {
                    Name = test,
                    SubjectId = subject.Id,
                    TopicId = topic.Id
                };

                var sut = CreateSut(context);
                await sut.AddActivityTemplateToTopicAsync(model);
                var activityTemplate = await context.ActivityTemplates.FirstOrDefaultAsync();
                topic.ActivityTemplates.Should().Contain(activityTemplate);
                activityTemplate.Name.Should().Be(test);
            }
        }

        [Test]
        public async Task AddTopicToSubjectAsync_WhenModelIsProvided_ThenTopicShouldBeAdded()
        {
            const string name = "TestName";
            using (var context = TestsUtilities.MakeContext("AddTopicToSubjectAsync"))
            {
                await context.Subjects.AddAsync(new Subject());
                await context.SaveChangesAsync();

                var model = new AddTopicToSubjectViewModel
                {
                    Name = name,
                    SubjectId = context.Subjects.FirstOrDefault().Id
                };
                var sut = CreateSut(context);
                await sut.AddTopicToSubjectAsync(model);
                var result = context.Topics.FirstOrDefault();
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task EditTopicToSubject_WhenModelIsProvided_ThenTopicShouldBeEdited()
        {
            const string name = "Test";
            using (var context = TestsUtilities.MakeContext("EditTopic"))
            {
                await context.Subjects.AddAsync(new Subject());
                await context.Topics.AddAsync(new Topic());
                await context.SaveChangesAsync();

                var model = new EditTopicViewModel
                {
                    Name = name,
                    Description = "Desc",
                    SubjectId = context.Subjects.FirstOrDefault().Id,
                    TopicId = context.Topics.FirstOrDefault().Id
                };
                var sut = CreateSut(context);
                await sut.EditTopicAsync(model);
                var result = context.Topics.FirstOrDefault();
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task GetTopicAsync_WhenModelIsProvided_ThenIsShouldReturnTopic()
        {
            using (var context = TestsUtilities.MakeContext("GetTopicAsync"))
            {
                var topic = new Topic();
                var subject = new Subject();
                await context.AddAsync(subject);
                await context.AddAsync(topic);
                await context.SaveChangesAsync();
                var model = new GetTopicViewModel
                {
                    SubjectId = subject.Id,
                    TopicId = topic.Id
                };
                var sut = CreateSut(context);
                var result = await sut.GetTopicAsync(model);
                result.Should().Be(topic);
            }
        }

        [Test]
        public async Task FetchTopics_WhenParamsAreProvided_ThenIsShouldReturnTopics()
        {
            using (var context = TestsUtilities.MakeContext("FetchTopics"))
            {
                const int index = 1;
                const int count = 10;
                var subject = new Subject();
                await context.AddAsync(subject);
                await context.AddAsync(new Topic
                {
                    Subject = subject,
                    Name = "Topic 1"
                });
                await context.AddAsync(new Topic
                {
                    Subject = subject,
                    Name = "Topic 2"
                });
                await context.AddAsync(new Topic
                {
                    Subject = subject,
                    Name = "Topic 3"
                });
                await context.SaveChangesAsync();
                var sut = CreateSut(context);
                var (result, totalCount) = await sut.FetchTopics(subject.Id, "", false, index, count);
                var topics = await context.Subjects.Include(s => s.Topics).SelectMany(s => s.Topics).ToArrayAsync();
                totalCount.Should().Be(topics.Length);
                result.Should().NotBeEmpty();
            }
        }

        [Test]
        public async Task ObsoleteTopicAsync_WhenIdIsProvided_ThenTopicShouldBeObsoleted()
        {
            using (var context = TestsUtilities.MakeContext("ObsoleteTopicAsync"))
            {
                var topic = new Topic();
                await context.AddAsync(topic);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                await sut.ObsoleteTopicAsync(topic.Id);
                var result = await context.Topics.FirstOrDefaultAsync();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RestoreTopicAsync_WhenIdIsProvided_ThenTopicShouldBeRestored()
        {
            using (var context = TestsUtilities.MakeContext("RestoreTopicAsync"))
            {
                var topic = new Topic
                {
                    Obsolete = true
                };
                await context.AddAsync(topic);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                await sut.RestoreTopicAsync(topic.Id);
                var result = await context.Topics.FirstOrDefaultAsync();
                result.Obsolete.Should().BeFalse();
            }
        }
    }
}