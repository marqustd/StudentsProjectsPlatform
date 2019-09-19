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

namespace Platform.Domain.Tests
{
    [TestFixture]
    internal class ActivitiesLogicTests
    {
        [SetUp]
        public void SetUp()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        private IFixture _fixture;

        private static IActivityTemplatesLogic CreateSut(PlatformDbContext context)
        {
            return new ActivityTemplatesLogic(new PlatformRepository(context),
                new TopicsDal(context));
        }

        [Test]
        public async Task EditActivityTemplateAsync_WhenModelIsProvided_ThenActivityShouldBeEdited()
        {
            const string name = "Test";
            using (var context = TestsUtilities.MakeContext("EditActivity"))
            {
                var activityTemplate = new ActivityTemplate();
                await context.AddAsync(activityTemplate);
                await context.SaveChangesAsync();

                var model = new EditActivityTemplateViewModel
                {
                    Name = name,
                    Description = "Desc",
                    ActivityId = activityTemplate.Id
                };
                var sut = CreateSut(context);
                await sut.EditActivityTemplateAsync(model);
                var result = context.ActivityTemplates.FirstOrDefault();
                result.Name.Should().Be(name);
            }
        }

        [Test]
        public async Task ObsoleteActivityTemplateAsync_WhenIdIsProvided_ThenActivityShouldBeObsoleted()
        {
            using (var context = TestsUtilities.MakeContext("ObsoleteActivityAsync"))
            {
                var activityTemplate = new ActivityTemplate();
                await context.AddAsync(activityTemplate);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                await sut.ObsoleteActivityTemplateAsync(activityTemplate.Id);
                var result = await context.ActivityTemplates.FirstOrDefaultAsync();
                result.Obsolete.Should().BeTrue();
            }
        }

        [Test]
        public async Task RemoveActivityTemplateAsync_WhenIdIsProvided_ThenActivityShouldBeRemoved()
        {
            using (var context = TestsUtilities.MakeContext("RemoveActivityTemplateAsync"))
            {
                var topic = new Topic();
                await context.AddAsync(topic);
                await context.SaveChangesAsync();
                var activityTemplate = new ActivityTemplate();
                await context.AddAsync(activityTemplate);
                topic.ActivityTemplates.Add(activityTemplate);
                await context.SaveChangesAsync();

                var model = new RemoveActivityTemplateViewModel
                {
                    ActivityId = activityTemplate.Id,
                    TopicId = topic.Id
                };

                var sut = CreateSut(context);
                await sut.RemoveActivityTemplateAsync(model);
                var result = await context.ActivityTemplates.FirstOrDefaultAsync();
                result.Should().BeNull();
                topic = await context.Topics.FirstOrDefaultAsync();
                topic.ActivityTemplates.Should().BeEmpty();
            }
        }

        [Test]
        public async Task RestoreActivityAsync_WhenIdIsProvided_ThenActivityShouldBeRestored()
        {
            using (var context = TestsUtilities.MakeContext("RestoreActivityAsync"))
            {
                var activity = new ActivityTemplate
                {
                    Obsolete = true
                };
                await context.AddAsync(activity);
                await context.SaveChangesAsync();

                var sut = CreateSut(context);
                await sut.RestoreActivityTemplateAsync(activity.Id);
                var result = await context.ActivityTemplates.FirstOrDefaultAsync();
                result.Obsolete.Should().BeFalse();
            }
        }
    }
}