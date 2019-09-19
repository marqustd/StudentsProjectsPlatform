namespace Platform.Infrastructure.Entities
{
    public class ActivityTemplate : PlatformEntityWithName
    {
        public string Description { get; set; }
        public bool IncludeArtifact { get; set; }
    }
}