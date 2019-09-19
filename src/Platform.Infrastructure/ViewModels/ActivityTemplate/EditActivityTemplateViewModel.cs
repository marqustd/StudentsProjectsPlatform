namespace Platform.Infrastructure.ViewModels.ActivityTemplate
{
    public sealed class EditActivityTemplateViewModel
    {
        public int ActivityId { get; set; }
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IncludeArtifact { get; set; }
    }
}