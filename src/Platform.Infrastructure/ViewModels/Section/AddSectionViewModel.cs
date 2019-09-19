namespace Platform.Infrastructure.ViewModels.Section
{
    public sealed class AddSectionViewModel
    {
        public int SubjectId { get; set; }
        public int SemesterId { get; set; }
        public int TopicId { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
    }
}