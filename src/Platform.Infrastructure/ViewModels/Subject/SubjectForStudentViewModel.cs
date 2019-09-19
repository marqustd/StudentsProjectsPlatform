namespace Platform.Infrastructure.ViewModels.Subject
{
    public class SubjectForStudentViewModel
    {
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public string Description { get; set; }
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public int? SectionId { get; set; }
    }
}
