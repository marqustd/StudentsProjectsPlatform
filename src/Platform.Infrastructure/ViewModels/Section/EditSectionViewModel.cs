namespace Platform.Infrastructure.ViewModels.Section
{
    public sealed class EditSectionViewModel
    {
        public int SectionId { get; set; }
        public int TopicId { get; set; }
        public int SubjectId { get; set; }
        public string Name { get; set; }
        public int State { get; set; }
        public int Capacity { get; set; }
    }
}