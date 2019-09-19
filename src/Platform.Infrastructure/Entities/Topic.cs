using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Entities
{
    public sealed class Topic : PlatformEntityWithName
    {
        [MaxLength(500)]
        public string Description { get; set; }

        public Subject Subject { get; set; }
        public IList<Section> Sections { get; set; } = new List<Section>();
        public IList<ActivityTemplate> ActivityTemplates { get; set; } = new List<ActivityTemplate>();
        public IList<TopicArtifact> TopicToArtifact { get; set; } = new List<TopicArtifact>();
    }
}