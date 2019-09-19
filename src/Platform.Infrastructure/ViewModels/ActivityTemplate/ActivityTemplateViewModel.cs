namespace Platform.Infrastructure.ViewModels.ActivityTemplate
{
    public sealed class ActivityTemplateViewModel
    {
        public int ActivityId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IncludeArtifact { get; set; }
        public bool Obsolete { get; set; }
    }
}