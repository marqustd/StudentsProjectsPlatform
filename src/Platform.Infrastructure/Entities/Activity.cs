using System.Collections.Generic;

namespace Platform.Infrastructure.Entities
{
    public sealed class Activity : PlatformEntityWithName
    {
        public string Description { get; set; }
        public bool IncludeArtifact { get; set; }
        public Artifact Artifact { get; set; }
        public ActivityTemplate ActivityTemplate { get; set; }
        public IList<Comment> Comments { get; set; } = new List<Comment>();
        public Section Section { get; set; }
        public IList<ActivityCheck> ActivityToCheck { get; set; } = new List<ActivityCheck>();
        public Topic Topic { get; set; }
        public Semester Semester { get; set; }
    }
}