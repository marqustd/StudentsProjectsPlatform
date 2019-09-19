namespace Platform.Infrastructure.ViewModels.ActivityTemplate
{
    public sealed class AddActivityTemplateViewModel
    {
        public int SubjectId { get; set; }
        public int TopicId { get; set; }
        public string Name { get; set; }
        public bool IncludeArtifact { get; set; }
        public string Description { get; set; }
    }
}