namespace Platform.Infrastructure.ViewModels.Section
{
    public sealed class SectionViewModel
    {
        public int SectionId { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int MembersCount { get; set; }
        public int TopicId { get; set; }
        public string TopicName { get; set; }
    }
}