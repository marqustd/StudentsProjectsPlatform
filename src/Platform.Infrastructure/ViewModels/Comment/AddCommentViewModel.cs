namespace Platform.Infrastructure.ViewModels.Comment
{
    public sealed class AddCommentViewModel
    {
        public int SubjectId { get; set; }
        public int SectionId { get; set; }
        public int SemesterId { get; set; }
        public string Content { get; set; }
        public int ActivityId { get; set; }
    }
}